import {FaunaDBQueryManager, q} from '../../fauna/config';

const updateShow = async (req, res) => {
  if (req.method == 'POST') {
    const {title, watched} = {...JSON.parse(req.body)};
    try {
      const response = await new FaunaDBQueryManager({}).client.query(
        q.Update(
          q.Select(['ref'], q.Get(q.Match(q.Index('shows_by_title'), title))),
          {
            data: {
              watched,
            },
          }
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

export default updateShow;
