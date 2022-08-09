- Referenct

  - [with-material-ui](https://formik.org/docs/examples/with-material-ui)

- Memo
  - UDF 経由でコレクションを操作したほうが、権限設定がハンディになる
    - ロールの設定上は read/delete しか自身のデータのみの制限は加えられない
      - 実行時には自身のデータのみハンドリングできるようにふるまってくれる（update/delete）
    - リソースの所有者を問わず共有リソースの定義もできる（public）
  - Fauna デフォルトの認証機構使うと、適切なロール設定を行うことで自身のデータのみハンドリングできるようになる

## Set Env

```bash
$ export REACT_APP_FAUNA_DB_SERVER_KEY=HERE_YOUR_KEY
```

## Clean Up

```bash
$ time yarn clean
```

## Set Up

```bash
$ time yarn setup
```

## Serve Dev

```bash
$ yarn dev
```

## Build

```bash
$ yarn build
```

## Serve

```bash
$ yarn serve
```

