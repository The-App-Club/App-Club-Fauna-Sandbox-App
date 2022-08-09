import {FaunaDBQueryManager, q} from '../../fauna/config';
export default async (req, res) => {
  if (req.method == 'POST') {
    try {
      const {title} = {...JSON.parse(req.body)};
      const response = await new FaunaDBQueryManager({}).client.query(
        q.Create(q.Collection('shows'), {
          data: {title, watched: false},
        })
      );
      res.status(200).json({data: response});
    } catch (error) {
      console.log(error);
      res.status(500).json({data: `something went wrong...`});
    }
  }
};
