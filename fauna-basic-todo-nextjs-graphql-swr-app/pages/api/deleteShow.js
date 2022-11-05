import {FaunaDBQueryManager, q} from '../../fauna/config';

const deleteShow = async (req, res) => {
  if (req.method == 'POST') {
    const {title} = {...JSON.parse(req.body)};
    try {
      const response = await new FaunaDBQueryManager({}).client.query(
        q.Delete(
          q.Select(['ref'], q.Get(q.Match(q.Index('shows_by_title'), title)))
        )
      );
      res
        .status(200)
        .json({data: response, message: `success`, statusCode: 200});
    } catch (error) {
      res.status(500).json({
        data: {title},
        message: error.description,
        statusCode: error.requestResult.statusCode,
      });
    }
  }
};
export default deleteShow;
