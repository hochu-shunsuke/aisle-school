// ボタンコンポーネントを読み込み
async function loadButtonComponent() {
  try {
    const response = await fetch('/components/ui/button.html');
    const html = await response.text();
    
    // テンプレートとスクリプトを分離
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    const template = tempDiv.querySelector('template');
    const script = tempDiv.querySelector('script');
    
    if (template && script) {
      // テンプレートをHTMLに追加
      document.head.appendChild(template);
      
      // スクリプトを実行
      const newScript = document.createElement('script');
      newScript.textContent = script.textContent;
      document.head.appendChild(newScript);
      
      console.log('Button component loaded successfully');
    }
  } catch (error) {
    console.error('Button component load failed:', error);
  }
}

// DOM読み込み完了時にボタンコンポーネントを読み込み
document.addEventListener('DOMContentLoaded', loadButtonComponent);
