- Memo
  - 同じ名前でオブジェクトを作成する場合は 60 秒の待ち時間がある
  - ドキュメントの複数件取得はインデックス経由で明示的に記載する必要がある
  - オペレーション速いとダッシュボードの挙動が怪しくなるので、シークレットモードを使って原因を棲み分ける
    - サインアウトしてサインインするとだいたい治る
  - コレクション同士を紐づけるときには refID で紐づけるので、リレーション実現するなら、管理できる範疇に収める

```bash
$ yarn kick getCollectionList.js
yarn run v1.22.17
warning package.json: No license field
$ node -r esm getCollectionList.js
{
  data: [
    Collection("stores"),
    Collection("products"),
    Collection("customers"),
    Collection("managers"),
    Collection("orders")
  ]
}
Done in 1.46s.
```
