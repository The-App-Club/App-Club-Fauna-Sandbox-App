import {query as q} from 'faunadb';
import {FaunaDBManager} from '../../utils/faunaFQLClient';

export default async function user(req, res) {
  const client = new FaunaDBManager().client;
  const {email} = req.body;
  if (!email) {
    return res.status(401).json({
      httpStatus: 401,
      message: `Email not found`,
    });
  }
  try {
    const {ref, data} = await client.query(
      q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email)))
    );
    return res.status(200).json({...data, id: ref.id, httpStatus: 200});
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      httpStatus: 500,
      message: `something went wrong...`,
    });
  }
}
