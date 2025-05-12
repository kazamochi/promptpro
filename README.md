# Prompt Pro（プロプロ）

🧠 あなたのプロンプト作成を革新する、直感型プロンプト支援ツール。

---

## 🔧 機能概要

- ✅ カテゴリ選択式（学習・SNS・創作など9種）
- ✅ テンプレート埋込式：`{{input}}`で即生成
- ✅ 折りたたみ式指示入力（自由に追加）
- ✅ モバイル完全対応（スマホで完結）
- ✅ コピー＆ガイドUI付き
- ✅ 教育用AutoReviewモード搭載（APIなし）

---

## 🚀 デプロイ＆実行方法（Next.js + Vercel）

### 📁 ディレクトリ構成（主要フォルダ）

- `/components/` … GUI本体（PrompthesisGUI.jsx）
- `/data/` … テンプレート定義（prompthesisTemplates.js）
- `/pages/` … エントリーポイント（index.jsx, _app.jsx）
- `/styles/` … Tailwindスタイル（index.css）
- その他：`tailwind.config.js`, `postcss.config.js`, `package.json`, `README.md`

---

### 🛠 ローカル実行

```bash
npm install
npm run dev
# http://localhost:3000 にアクセス
📜 利用方針
🚫 アダルト・過激広告は非搭載

🆓 教育向け無料公開を前提としつつ、将来的には有料版構想あり

🔒 GUI思想・構造・UXすべてLDSフェーズ8.0にて評価ロック済

📛 開発者
設計監修：もっちー（Prompt Architect）

構造担当：Veelex（ヴィレックス　通称ヴィー
