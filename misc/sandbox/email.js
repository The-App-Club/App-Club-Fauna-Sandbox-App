import {client, q} from './config';

// https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript/45250371
// https://docs.fauna.com/fauna/current/api/fql/functions/containsstrregex?lang=javascript
(async()=>{
  const response = await client.query(
    q.ContainsStrRegex(
      "test@gmail.com",
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    ) 
  )
  console.log(response)
})()