import {query as q} from 'faunadb';
import {FaunaDBManager} from '../../utils/faunaFQLClient';

export default async function logout(req, res) {
  const {token} = req.body;

  if (!token) {
    return res.status(200).json({
      httpStatus: 200,
      message: `already logout.`,
    });
  }

  try {
    const isLogout = await new FaunaDBManager(token).client.query(
      q.Logout(false)
    );
    if (isLogout) {
      return res.status(200).json({
        httpStatus: 200,
        message: `successfully logout.`,
      });
    } else {
      return res.status(500).json({
        httpStatus: 500,
        message: `something went wrong...`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      httpStatus: 500,
      message: `something went wrong...`,
    });
  }
}
