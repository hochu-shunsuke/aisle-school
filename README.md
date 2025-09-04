# AI駆動開発対応 Web Componentsシステム

---

## 🚀 コンセプト

**Web Components + CSS Design Tokens**を活用した、AI駆動開発に最適化されたコンポーネントシステム。
1つのHTMLファイルにHTML・CSS・JavaScriptを統合し、真の「再利用可能性」と「開発効率性」を実現。

---

## 📁 ディレクトリ構造

```sh
/
├── css/
│   ├── common.css                  # Design Tokens + ユーティリティクラス
│   └── components/
│       ├── header.css             # ヘッダー専用スタイル
│       └── footer.css             # フッター専用スタイル
├── components/
│   ├── header.html                # レガシーヘッダー
│   ├── footer.html                # レガシーフッター
│   └── ui/
│       ├── button.html            # 統合型ボタンコンポーネント
│       ├── page-title.html        # ページタイトルコンポーネント
│       └── page-detail.html       # ページ詳細文コンポーネント
├── js/
│   ├── components-loader.js       # Web Components自動読み込み
│   ├── header.js                  # ヘッダー制御
│   └── footer.js                  # フッター制御
├── pages/
│   ├── index.html                 # トップページ
│   └── demo.html                  # コンポーネントデモページ
└── images/                        # 画像アセット
```

---

## 🔧 Web Componentsシステム

### 基本コンセプト

#### 1つのHTMLファイル = 1つの完全なコンポーネント

- HTML構造
- CSS（Shadow DOM）
- JavaScript（イベント処理）
- 全てを統合して真の再利用性を実現

### コンポーネント例

```html
<!-- components/ui/button.html -->
<template id="button-template">
  <style>
    :host {
      display: block;
      margin-bottom: var(--spacing-md, 16px);
    }
    button {
      background-color: var(--color-primary, #2860A0);
      color: var(--color-white, #fff);
      border: 2px solid var(--color-primary, #2860A0);
      /* ... その他のスタイル */
    }
  </style>
  <button type="button">
    <slot></slot>
  </button>
</template>

<script>
  class ButtonComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      const template = document.getElementById('button-template');
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    
    connectedCallback() {
      const button = this.shadowRoot.querySelector('button');
      button.addEventListener('click', (e) => {
        this.dispatchEvent(new CustomEvent('button-click', {
          bubbles: true,
          detail: { text: this.textContent.trim() }
        }));
      });
    }
  }
  
  customElements.define('button-component', ButtonComponent);
</script>
```

### 使用方法

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 1行追加するだけで全コンポーネントが利用可能 -->
  <script src="/js/components-loader.js"></script>
</head>
<body>
  <!-- 即座に使える -->
  <button-component>送信</button-component>
  <page-title text="ページタイトル"></page-title>
  <page-detail text="ページの説明文"></page-detail>
</body>
</html>
```

---

## 🎨 CSS Design Tokensシステム

### Design Tokens（CSS Variables）

```css
:root {
  /* レイアウト */
  --site-max-width: 1200px;
  --site-gutter: 24px;
  --section-vertical: 64px;
  
  /* カラーパレット */
  --color-primary: #2860A0;
  --color-white: #fff;
  --color-black: #333;
  --color-gray-border: #e0e0e0;
  
  /* スペーシングシステム */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 40px;
  
  /* タイポグラフィ */
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
}
```

### レイアウトシステム（l-prefix）

```css
.l-site {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.l-section {
  padding: var(--section-vertical) 0;
}

.l-section__container {
  max-width: var(--site-max-width);
  margin: 0 auto;
  padding: 0 var(--site-gutter);
}
```

### ユーティリティクラス（u-prefix）

```css
/* テキスト */
.u-text-center { text-align: center !important; }
.u-text-left { text-align: left !important; }
.u-text-right { text-align: right !important; }

/* スペーシング */
.u-mb-sm { margin-bottom: var(--spacing-sm) !important; }
.u-mb-md { margin-bottom: var(--spacing-md) !important; }
.u-mb-lg { margin-bottom: var(--spacing-lg) !important; }
.u-mb-xl { margin-bottom: var(--spacing-xl) !important; }

/* 表示制御 */
.u-hidden { display: none !important; }
```

---

## 🤖 AI駆動開発での活用方法

### 1. 新しいコンポーネント作成

**AI指示例：**

```txt
「カードコンポーネントを作成してください：
- ファイル：components/ui/card.html
- 構成：画像、タイトル、説明文、ボタンを含む
- スタイル：Shadow DOMでカプセル化、CSS変数使用
- 使用法：<card-component title="タイトル" image="/path/to/image.jpg">説明文</card-component>
- レスポンシブ対応必須」
```

### 2. 既存コンポーネント修正

**AI指示例：**

```txt
「button-componentのスタイルを修正：
- ホバー時にアニメーション追加
- フォーカス時のアウトライン強化
- CSS変数（--color-primary）を使用して統一感維持」
```

### 3. ページ構築

**AI指示例：**

```txt
「新しいページを作成：
- l-section + l-section__containerでレイアウト
- 既存コンポーネント（button-component、page-title）を使用
- components-loader.jsで自動読み込み」
```

### 4. システム拡張

**AI指示例：**

```txt
「フォームコンポーネントを追加：
- input-component：バリデーション機能付き
- select-component：カスタムセレクトボックス
- components-loader.jsにも自動追加」
```

---

## ✅ 実装済み機能

- ✅ Web Components基盤システム
- ✅ CSS Design Tokens（変数システム）
- ✅ 自動コンポーネント読み込み（components-loader.js）
- ✅ レスポンシブレイアウトシステム
- ✅ ユーティリティクラス
- ✅ Shadow DOMによるスタイルカプセル化
- ✅ カスタムイベントシステム

---

## 🎯 AI駆動開発の利点

### 1. **真の再利用性**

- 1つのファイルで完結するコンポーネント
- どのページでも`<component-name>`で即座に使用可能
- スタイル競合の心配なし（Shadow DOM）

### 2. **開発効率性**

- `components-loader.js`で全コンポーネント自動読み込み
- CSS変数で一元的なデザイン管理
- AIが理解しやすい明確なファイル構造

### 3. **保守性**

- コンポーネント単位での修正・拡張
- Design Tokensによる統一感維持
- 依存関係のない独立したコンポーネント

### 4. **スケーラビリティ**

- 新コンポーネント追加時は1ファイル作成＋loader更新のみ
- レガシーコードとの共存可能
- 段階的移行をサポート

---

## 🚀 今後の拡張計画

1. **コンポーネントライブラリ拡充**
   - フォーム系（input, select, textarea）
   - ナビゲーション系（breadcrumb, pagination）
   - レイアウト系（grid, flex-container）

2. **ツール整備**
   - コンポーネント自動生成スクリプト
   - スタイルガイド自動生成
   - デザインシステムドキュメント

3. **パフォーマンス最適化**
   - 遅延読み込み対応
   - バンドル最適化
   - キャッシュ戦略

---

## 📖 開発者向けガイド

### コンポーネント作成ルール

1. **ファイル名**: `components/ui/[component-name].html`
2. **クラス名**: `[ComponentName]Component`
3. **タグ名**: `[component-name]`
4. **CSS変数使用**: 必須（Design Tokens活用）
5. **Shadow DOM**: 必須（スタイルカプセル化）
6. **イベント**: CustomEventで実装

### 効率的なAI指示のコツ

- 具体的なファイル名・クラス名を指定
- CSS変数の使用を明記
- レスポンシブ対応を必須条件として記載
- 既存のコンポーネントとの統一感を重視
- 段階的な実装（HTML→CSS→JS）を指示
