import {FaunaDBQueryManager, q} from '../../fauna/config';

export default async (req, res) => {
  if (req.method == 'POST') {
    try {
      const {title} = {...JSON.parse(req.body)};
      const response = await new FaunaDBQueryManager({}).client.query(
        q.Delete(
          q.Select(['ref'], q.Get(q.Match(q.Index('shows_by_title'), title)))
        )
      );
      res.status(200).json({data: response});
    } catch (error) {
      console.log(error);
      res.status(500).json({data: `something went wrong...`});
    }
  }
};
