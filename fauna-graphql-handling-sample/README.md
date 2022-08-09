## Ref

- [http client urql](https://formidable.com/open-source/urql/docs/basics/core/)
- [using-next-js-with-fauna-and-graphql](https://fauna.com/blog/using-next-js-with-fauna-and-graphql)
- [referenceerror-fetch-is-not-defined](https://stackoverflow.com/questions/48433783/referenceerror-fetch-is-not-defined)

## Set Up

upload schema.gql

## Do It

```bash
$ time node -r esm gq-fetch.js
$ time node -r esm gq-populate.js
$ time node -r esm urql-fetch.js
$ time node -r esm urql-populate.js
```
