- Concept

  - Passoword Free な認証ロジック

- Stack

  - [formik with-material-ui](https://formik.org/docs/examples/with-material-ui)
  - [yup](https://github.com/jquense/yup)
  - [mui](https://mui.com/)
  - [implementing-serverless-passwordless-login-with-faunadb](https://dev.to/gzuidhof/implementing-serverless-passwordless-login-with-faunadb-l30)
  - [Codice Fiscale](https://chancejs.com/person/cf.html)
  - [react-app-polyfill](https://www.npmjs.com/package/react-app-polyfill)
  - [swr](https://swr.vercel.app/ja)
  - [react-query](https://react-query.tanstack.com/)

- Todo
  - メール検証ロジックを実装
  - login token 有効期間の alive コンポーネントの実装
    - 強制ログアウト機能
      - cookie の account_id 逆引きしてログイントークンが有効化チェックする
        - 期間内ならそのまま
        - 期間外なら強制ログアウト
          - ログインページへリダイレクト
      - swr or react-query で間引きながらポーリング監視で実現

## Set Env

```bash
$ export REACT_APP_FAUNA_DB_SERVER_KEY=HERE_YOUR_KEY
```

## Clean Up

```bash
$ yarn clean
```

## Set Up

```bash
$ yarn setup
```
