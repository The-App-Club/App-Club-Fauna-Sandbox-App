import {client, q} from './config';

// https://docs.fauna.com/fauna/current/api/fql/functions/filter?lang=javascript
// https://docs.fauna.com/fauna/current/api/fql/functions/gt?lang=javascript
// https://fauna.com/blog/boosting-developer-productivity-with-string-functions
// https://docs.fauna.com/fauna/current/learn/tutorials/fql/basics/indexes

function WordPartGenerator(WordVar) {
  return q.Let(
    {
      indexes: q.Map(
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        q.Lambda('index', q.Subtract(q.Length(WordVar), q.Var('index')))
      ),
      indexesFiltered: q.Filter(
        q.Var('indexes'),
        // filter out the ones below 0
        q.Lambda('l', q.GT(q.Var('l'), 0))
      ),
      ngramsArray: q.Map(
        q.Var('indexesFiltered'),
        q.Lambda('l', q.NGram(q.LowerCase(WordVar), q.Var('l'), q.Var('l')))
      ),
    },
    q.Var('ngramsArray')
  );
}

(async () => {
  const response = await client.query(
    WordPartGenerator('just another cowboy bebop world')
  );
  console.log(response);
})();
