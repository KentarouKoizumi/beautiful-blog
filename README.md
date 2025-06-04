# beautiful-blog

デザインにこだわったシンプルなブログアプリです。

## セットアップ

```
npm install
npm run dev
```

## GitHub Pages

以下のコマンドで静的ファイルを `docs/` フォルダに生成し、GitHub Pages で公開できます。

```
npm run export
```

生成された `docs/` フォルダをコミットし、リポジトリの設定で Pages の公開先を `docs/` に指定してください。

## 構成
- `posts/` ディレクトリに Markdown 記事を保管します。
- `pages/` 以下で記事一覧と記事ページを表示します。
