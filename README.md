# beautiful-blog

デザインにこだわったシンプルなブログアプリです。

## セットアップ

```
npm install
npm run dev
```

## GitHub Pages

GitHub Actions で自動的にビルド・デプロイされるよう設定しています。ローカルで確認したい場合は次のコマンドを実行します。

```
npm run export
```

`docs/` フォルダに静的ファイルが生成されますが、コミットする必要はありません。GitHub Pages の公開先は `GitHub Actions` を選択してください。

## 構成
- `posts/` ディレクトリに Markdown 記事を保管します。
- `pages/` 以下で記事一覧と記事ページを表示します。
- `styles/` にグローバル CSS を置き、`framer-motion` でアニメーションを実装しています。

