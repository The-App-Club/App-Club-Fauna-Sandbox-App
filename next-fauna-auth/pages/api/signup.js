import {query as q} from 'faunadb';
import {FaunaDBManager} from '../../utils/faunaFQLClient';

export default async function signup(req, res) {
  const client = new FaunaDBManager().client;
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({
      httpStatus: 400,
      message: `Email and Password not provided.`,
    });
  }

  try {
    const existingEmail = await client.query(
      q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(email)))
    );

    if (existingEmail) {
      return res.status(401).json({
        httpStatus: 401,
        message: `Email ${email} already exists.`,
      });
    }

    const user = await client.query(
      q.Create(q.Collection('User'), {
        credentials: {password},
        data: {email},
      })
    );

    if (!user.ref) {
      return res.status(500).json({
        httpStatus: 500,
        message: `user ref is missing.`,
      });
    }

    const auth = await client.query(
      q.Login(user.ref, {
        password,
      })
    );

    if (!auth.secret) {
      return res.status(500).json({
        httpStatus: 500,
        message: `auth secret is missing.`,
      });
    }
    return res.status(200).json({
      httpStatus: 200,
      message: `successfully signup.`,
      token: auth.secret,
    });
  } catch (error) {
    return res.status(500).json({
      httpStatus: 500,
      message: JSON.stringify(error),
    });
  }
}
