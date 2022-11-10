import {query as q} from 'faunadb';
import {FaunaDBManager} from '../../utils/faunaFQLClient';

export default async function login(req, res) {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({
      httpStatus: 400,
      message: `Email and Password not provided.`,
    });
  }
  try {
    const response = await new FaunaDBManager().client.query(
      q.Login(q.Match(q.Index('user_by_email'), q.Casefold(email)), {
        password,
      })
    );

    if (!response.secret) {
      return res.status(401).json({
        httpStatus: 401,
        message: `auth secret is missing.`,
      });
    }

    res.status(200).json({
      httpStatus: 200,
      token: response.secret,
      message: `successfully login.`,
    });
  } catch (error) {
    console.log(error);

    if (error.requestResult.statusCode === 400) {
      return res.status(400).json({
        httpStatus: 400,
        message: error.description,
      });
    }

    return res.status(500).json({
      httpStatus: 500,
      message: `somthing went wrong...`,
    });
  }
}
