- HTTP によるログイン

```bash
$ curl -X GET -s https://db.fauna.com/tokens/self -u "fnEEhpWSbUACVASGNHYEkApTdrzZJ0lFbRDiLJc1VsQVG6hZ34U:secret password" | jq
{
  "resource": {
    "ref": {
      "@ref": {
        "id": "326112479161614932",
        "class": {
          "@ref": {
            "id": "tokens"
          }
        }
      }
    },
    "ts": 1647263945680000,
    "instance": {
      "@ref": {
        "id": "326112328640627282",
        "class": {
          "@ref": {
            "id": "users",
            "class": {
              "@ref": {
                "id": "classes"
              }
            }
          }
        }
      }
    },
    "hashed_secret": "$2a$05$0FUxoULolnrTMKp/12SA6ObE8w2llJhngph7vdiueSC5Rq8S/AR/C"
  }
}
```

```bash
$ curl -X GET -s https://db.fauna.com/tokens/self -u "not_a_valid_secret:secret password" | jq
{
  "errors": [
    {
      "code": "unauthorized",
      "description": "Unauthorized"
    }
  ]
}
```

- シェルでのログイン中の再現

```bash
$ yarn kick login.js
yarn run v1.22.17
warning package.json: No license field
$ node -r esm login.js
{
  ref: Ref(Tokens(), "326117607013876308"),
  ts: 1647268835976000,
  ttl: Time("2022-03-14T17:40:35.851526Z"),
  instance: Ref(Collection("SpaceUsers"), "326116461225443924"),
  secret: 'fnEEhpo8WRACVASGNHYEkApTtIdyF7qxjx3c8C9HkMHE2-I8ZwU'
}
Done in 1.55s.

$ fauna shell --secret="fnEEhpo8WRACVASGNHYEkApTtIdyF7qxjx3c8C9HkMHE2-I8ZwU"
Connected to https://db.fauna.com
Type Ctrl+D or .exit to exit the shell
> Get(Ref(Collection("SpaceUsers"),"326116461225443924"))
{
  ref: Ref(Collection("SpaceUsers"), "326116461225443924"),
  ts: 1647267743265000,
  data: { email: 'darth@empire.com' }
}
>
>
> Get(Ref(Collection("SpaceUsers"),"326117384514437714"))
Error: permission denied
{
  errors: [
    {
      position: [],
      code: 'permission denied',
      description: 'Insufficient privileges to perform the action.'
    }
  ]
}
>
```
