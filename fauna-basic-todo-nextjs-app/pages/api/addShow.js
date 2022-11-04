import {FaunaDBQueryManager, q} from '../../fauna/config';
const addShow = async (req, res) => {
  if (req.method == 'POST') {
    const {title} = {...JSON.parse(req.body)};
    try {
      const response = await new FaunaDBQueryManager({}).client.query(
        q.Create(q.Collection('shows'), {
          data: {title, watched: false},
        })
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

export default addShow;
