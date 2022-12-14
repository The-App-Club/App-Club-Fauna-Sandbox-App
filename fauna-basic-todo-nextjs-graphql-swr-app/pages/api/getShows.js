import {FaunaDBQueryManager, q} from '../../fauna/config';

const getShows = async (req, res) => {
  if (req.method == 'GET') {
    try {
      const response = await new FaunaDBQueryManager({}).client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('shows'))),
          q.Lambda('X', q.Get(q.Var('X')))
        )
      );
      res
        .status(200)
        .json({data: response.data, message: `success`, statusCode: 200});
    } catch (error) {
      res.status(500).json({
        data: `something went wrong...`,
        message: error.description,
        statusCode: error.requestResult.statusCode,
      });
    }
  }
};
export default getShows;
