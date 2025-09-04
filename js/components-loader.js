/**
 * Web Components自動読み込み
 */

// コンポーネント読み込み関数
const loadComponent = async (path) => {
  try {
    const response = await fetch(path);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // テンプレート追加
    const template = doc.querySelector('template');
    if (template) document.head.appendChild(template);
    
    // スクリプト実行
    const script = doc.querySelector('script');
    if (script) eval(script.textContent);
    
  } catch (error) {
    console.error(`Component load failed: ${path}`, error);
  }
};

// 全コンポーネント自動読み込み
[
  '/components/ui/button.html'
].forEach(loadComponent);
