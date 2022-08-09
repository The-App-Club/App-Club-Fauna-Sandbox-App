import {client, q} from './config';

(async () => {
  try {
    let response;
    response = await client.query(
      q.Foreach(
        [
          ['triangle', 'yellow'],
          ['square', 'green'],
          ['circle', 'blue'],
        ],
        q.Lambda(
          'shape',
          q.Create(q.Collection('shapes'), {
            data: {
              name: q.Select(0, q.Var('shape')),
              color: q.Select(1, q.Var('shape')),
            },
          })
        )
      )
    );
    console.log(response);

    response = await client.query(
      q.Foreach(
        [
          ['pentagon', 'black'],
          ['hexagon', 'cyan'],
          ['octagon', 'red'],
        ],
        q.Lambda(
          'shape',
          q.Create(q.Collection('shapes'), {
            data: {
              name: q.Select(0, q.Var('shape')),
              color: q.Select(1, q.Var('shape')),
            },
          })
        )
      )
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
