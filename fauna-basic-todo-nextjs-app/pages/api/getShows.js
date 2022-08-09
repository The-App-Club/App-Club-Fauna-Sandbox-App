import {FaunaDBQueryManager, q} from '../../fauna/config';

export default async (req, res) => {
  if (req.method == 'GET') {
    try {
      const response = await new FaunaDBQueryManager({}).client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('shows'))),
          q.Lambda('X', q.Get(q.Var('X')))
        )
      );
      res.status(200).json({data: response.data});
    } catch (error) {
      console.log(error);
      res.status(500).json({data: `something went wrong...`});
    }
  }
};
