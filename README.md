# AI駆動開発の推奨方法（静的サイト）

---

## 基本原則

ラッパをきちんと設定し、コンポーネント化を徹底することでAIが理解しやすく、指示を出しやすい構成にする。

## 1. 構造とスタイルの分離

- HTMLはコンポーネント単位（例：header.html, button.html）で分割
- CSSはcommon.css, components.cssなどで一元管理
- コンポーネントごとに固有クラス名（BEMやBlock-Element命名）を使い、スタイル衝突を防ぐ

## 2. JSによる動的生成

- 共通部品はJS関数やテンプレートで生成し、引数（props）で内容を差し替え
- 例：`createButton(label, href)`のように、テキストやリンク先を動的に渡す

## 3. アセット・パス管理

- 画像・SVG等はpublic/配下に集約し、ルート相対パスで参照
- 命名規則を統一し、AIで一括管理・生成しやすくする

## 4. 設計ルールの明文化

- クラス命名規則・ディレクトリ構成・CSS設計方針をREADMEやdev.mdに記載
- AI指示例も残しておくと、今後の自動生成・修正が効率化

## 5. テスト・プレビュー重視

- 開発サーバーで即時プレビュー＆ホットリロード
- 変更は小さく分割し、都度AIで差分生成・修正

---

## 現在の実装状況（2025/09/03時点）

### ディレクトリ構造

```sh
/
├── css/
│   ├── common.css           # サイト全体の共通スタイル・Design Token
│   └── components/
│       ├── header.css       # ヘッダー専用スタイル
│       └── footer.css       # フッター専用スタイル
├── components/
│   ├── header.html          # ヘッダーコンポーネント
│   └── footer.html          # フッターコンポーネント
├── js/
│   ├── header.js           # ヘッダー読み込み＆インタラクション
│   └── footer.js           # フッター読み込み
├── pages/
│   └── index.html          # メインページ（l-site構造使用）
└── images/                 # 画像アセット
```

### CSS設計システム

#### 1. Design Token（common.css）

```css
:root {
  /* レイアウト */
  --site-max-width: 1200px;
  --site-gutter: 24px;
  --site-gutter-sm: 16px;
  
  /* 色定義 */
  --color-primary: #2860A0;
  --color-white: #fff;
  --color-black: #333;
  --color-gray-border: #e0e0e0;
  
  /* スペーシング */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 40px;
}
```

#### 2. レイアウトシステム（l-prefix）

- `.l-site`: 全ページ共通のFlexboxコンテナ（sticky footer対応）
- `.l-site__main`: メインコンテンツエリア（flex: 1）
- `.l-section`: セクション用ラッパー
- `.l-section__container`: セクション内コンテンツコンテナ

#### 3. コンポーネント設計（BEM）

- `header.html` + `header.css`: レスポンシブヘッダー（ハンバーガーメニュー対応）
- `footer.html` + `footer.css`: レスポンシブフッター（PC横並び・モバイル縦積み）

### 実装済み機能

✅ ヘッダー：固定レイアウト、レスポンシブ、ハンバーガーメニュー
✅ フッター：レスポンシブ、中央揃え（モバイル）
✅ 共通CSS変数によるDesign Token管理
✅ コンポーネント化されたHTML/CSS/JS構造
✅ fetch-based動的コンポーネント読み込み

---

## AI駆動開発効率化のための拡張提案

### A. CSS設計システムの拡張

#### 1. ユーティリティクラス（u-prefix）

```css
/* テキスト関連 */
.u-text-center { text-align: center; }
.u-text-left { text-align: left; }
.u-text-right { text-align: right; }

/* スペーシング */
.u-mt-sm { margin-top: var(--spacing-sm); }
.u-mt-md { margin-top: var(--spacing-md); }
.u-mb-lg { margin-bottom: var(--spacing-lg); }
.u-p-xl { padding: var(--spacing-xl); }

/* 表示制御 */
.u-hidden { display: none; }
.u-sr-only { /* スクリーンリーダー専用 */ }

/* レスポンシブ表示 */
.u-hidden-mobile { @media (max-width: 768px) { display: none; } }
.u-hidden-desktop { @media (min-width: 769px) { display: none; } }
```

#### 2. 汎用コンポーネント（c-prefix）

```css
/* ボタンシステム */
.c-btn { /* ベースボタン */ }
.c-btn--primary { /* プライマリボタン */ }
.c-btn--secondary { /* セカンダリボタン */ }
.c-btn--outline { /* アウトラインボタン */ }

/* カードシステム */
.c-card { /* ベースカード */ }
.c-card__header { /* カードヘッダー */ }
.c-card__body { /* カード本文 */ }
.c-card__footer { /* カードフッター */ }

/* フォームシステム */
.c-form-group { /* フォームグループ */ }
.c-input { /* 入力フィールド */ }
.c-label { /* ラベル */ }
```

### B. コンポーネントライブラリの拡張

#### 1. 再利用可能コンポーネント

```sh
components/
├── ui/
│   ├── button.html         # 汎用ボタン
│   ├── card.html          # カードコンポーネント
│   ├── form-group.html    # フォームグループ
│   └── breadcrumb.html    # パンくずリスト
├── layout/
│   ├── hero.html          # ヒーローセクション
│   ├── cta.html           # CTA（Call to Action）
│   └── testimonial.html   # お客様の声
└── page-specific/
    ├── course-list.html   # 講座一覧
    └── contact-form.html  # お問い合わせフォーム
```

#### 2. JavaScript モジュール化

```sh
js/
├── utils/
│   ├── component-loader.js  # 汎用コンポーネント読み込み
│   ├── form-validator.js    # フォームバリデーション
│   └── modal.js            # モーダル制御
├── components/
│   ├── header.js
│   ├── footer.js
│   ├── slider.js           # スライダー
│   └── accordion.js        # アコーディオン
└── pages/
    ├── index.js            # トップページ専用
    └── contact.js          # お問い合わせページ専用
```

### C. AI指示の効率化

#### 1. コンポーネント作成の定型指示

```sh
「[コンポーネント名]コンポーネントを作成して：
- HTML: components/ui/[name].html
- CSS: css/components/[name].css
- JS: js/components/[name].js
- BEM命名規則でクラス名
- レスポンシブ対応
- CSS変数（common.css）使用」
```

#### 2. レスポンシブ対応の指示

```sh
「768px以下でモバイル表示、それ以上でデスクトップ表示
- --spacing-*でスペーシング統一
- .u-hidden-mobile/.u-hidden-desktopで表示制御」
```

### D. 開発フロー最適化

#### 1. コンポーネント単位での開発

1. HTMLで構造作成
2. CSS（design token使用）でスタイリング
3. JSで必要に応じてインタラクション追加
4. レスポンシブ確認
5. 他ページでの再利用検証

#### 2. Design Systemの段階的拡張

1. common.cssで新しいトークン追加
2. 汎用クラス（u-*, c-*）で再利用性向上
3. コンポーネントライブラリの充実
4. ドキュメント化（このdev.md更新）

---

## AI開発指示の実例

### よく使う指示パターン

1. **新コンポーネント作成**：
   「講座カードコンポーネントを作成。画像、タイトル、説明文、価格、ボタンを含む。レスポンシブ対応でBEM命名」

2. **既存コンポーネント修正**：
   「ヘッダーのモバイルメニューをスライドインからフェードインに変更」

3. **レイアウト調整**：
   「フッターロゴを左寄せから中央寄せに変更、スマホでは縦積み中央揃え」

4. **汎用クラス追加**：
   「margin/paddingの汎用クラス（u-m*, u-p*）をcommon.cssに追加」

### 効率的な開発のために

- 変更は小さい単位で区切る
- 1つのコンポーネントずつ完成させる
- CSS変数の活用を必ず指示に含める
- レスポンシブ対応は最初から考慮
- BEM命名規則の徹底
