import {query as q} from 'faunadb';
import {FaunaDBManager} from '../../utils/faunaFQLClient';

export default async function user(req, res) {
  const {token} = req.body;
  if (!token) {
    return res.status(401).json({
      httpStatus: 401,
      message: `Auth cookie not found`,
    });
  }
  try {
    const {ref, data} = await new FaunaDBManager(token).client.query(
      q.Get(q.CurrentIdentity())
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
