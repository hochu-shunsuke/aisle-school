/**
 * 汎用コンポーネントローダー
 * AI駆動開発用のコンポーネント動的読み込みユーティリティ
 */

class ComponentLoader {
  constructor() {
    this.componentCache = new Map();
    this.loadedComponents = new Set();
  }

  /**
   * コンポーネントを読み込んで指定要素に挿入
   * @param {string} componentPath - コンポーネントファイルのパス
   * @param {string} targetSelector - 挿入先の要素セレクタ
   * @param {Object} props - コンポーネントに渡すプロパティ
   */
  async loadComponent(componentPath, targetSelector, props = {}) {
    try {
      const targetElement = document.querySelector(targetSelector);
      if (!targetElement) {
        console.error(`Target element not found: ${targetSelector}`);
        return;
      }

      // キャッシュから取得または新規読み込み
      let html = this.componentCache.get(componentPath);
      if (!html) {
        const response = await fetch(componentPath);
        if (!response.ok) {
          throw new Error(`Failed to load component: ${componentPath}`);
        }
        html = await response.text();
        this.componentCache.set(componentPath, html);
      }

      // プロパティを適用してHTMLを変換
      const processedHtml = this.processProps(html, props);
      
      // 要素に挿入
      targetElement.innerHTML = processedHtml;
      
      // コンポーネント固有の初期化処理
      this.initializeComponent(targetElement, componentPath);
      
      this.loadedComponents.add(componentPath);
      
      console.log(`Component loaded: ${componentPath}`);
    } catch (error) {
      console.error(`Error loading component ${componentPath}:`, error);
    }
  }

  /**
   * HTMLテンプレート内のプロパティを置換
   * @param {string} html - HTMLテンプレート
   * @param {Object} props - 置換するプロパティ
   */
  processProps(html, props) {
    let processedHtml = html;
    
    // {{propName}} 形式のプレースホルダーを置換
    Object.keys(props).forEach(key => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      processedHtml = processedHtml.replace(placeholder, props[key]);
    });
    
    return processedHtml;
  }

  /**
   * コンポーネント固有の初期化処理
   * @param {Element} element - 挿入されたコンポーネント要素
   * @param {string} componentPath - コンポーネントパス
   */
  initializeComponent(element, componentPath) {
    // ボタンコンポーネントの初期化
    if (componentPath.includes('button')) {
      this.initializeButtons(element);
    }
    
    // フォームコンポーネントの初期化
    if (componentPath.includes('form')) {
      this.initializeForms(element);
    }
    
    // カードコンポーネントの初期化
    if (componentPath.includes('card')) {
      this.initializeCards(element);
    }
  }

  /**
   * ボタンコンポーネントの初期化
   */
  initializeButtons(container) {
    const buttons = container.querySelectorAll('.c-btn');
    buttons.forEach(button => {
      // クリックイベントのデフォルト処理
      button.addEventListener('click', (e) => {
        if (!button.href && button.type !== 'submit') {
          console.log('Button clicked:', button.textContent.trim());
        }
      });
    });
  }

  /**
   * フォームコンポーネントの初期化
   */
  initializeForms(container) {
    const inputs = container.querySelectorAll('.c-input');
    inputs.forEach(input => {
      // フォーカス時の処理
      input.addEventListener('focus', () => {
        input.closest('.c-form-group')?.classList.add('is-focused');
      });
      
      input.addEventListener('blur', () => {
        input.closest('.c-form-group')?.classList.remove('is-focused');
      });
    });
  }

  /**
   * カードコンポーネントの初期化
   */
  initializeCards(container) {
    const cards = container.querySelectorAll('.c-card');
    cards.forEach(card => {
      // ホバーエフェクト
      card.addEventListener('mouseenter', () => {
        card.classList.add('is-hovered');
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('is-hovered');
      });
    });
  }

  /**
   * 複数コンポーネントの一括読み込み
   * @param {Array} components - [{path, target, props}] の配列
   */
  async loadMultipleComponents(components) {
    const promises = components.map(component => 
      this.loadComponent(component.path, component.target, component.props)
    );
    
    try {
      await Promise.all(promises);
      console.log('All components loaded successfully');
    } catch (error) {
      console.error('Error loading multiple components:', error);
    }
  }

  /**
   * 読み込み済みコンポーネントの情報を取得
   */
  getLoadedComponents() {
    return Array.from(this.loadedComponents);
  }

  /**
   * キャッシュをクリア
   */
  clearCache() {
    this.componentCache.clear();
    this.loadedComponents.clear();
  }
}

// グローバルインスタンスを作成
window.componentLoader = new ComponentLoader();

// AI開発用のヘルパー関数
window.loadComponent = (path, target, props) => {
  return window.componentLoader.loadComponent(path, target, props);
};

// 使用例：
// loadComponent('/components/ui/button.html', '#button-container', {
//   text: 'クリックしてください',
//   type: 'primary'
// });
