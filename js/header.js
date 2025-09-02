// header.js: ヘッダーコンポーネントの読み込み＆ハンバーガーメニュー

// ヘッダーコンポーネントの読み込み
fetch('/components/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-placeholder').innerHTML = html;
    
    // ヘッダー読み込み後にハンバーガーメニューを初期化
    initializeHeaderMenu();
  });

// ハンバーガーメニューの初期化
function initializeHeaderMenu() {
  const navToggle = document.querySelector('.header__nav-toggle');
  const navMenu = document.querySelector('.header__nav-menu');
  const overlay = document.querySelector('.header__overlay');
  
  if (navToggle && navMenu && overlay) {
    navToggle.addEventListener('click', function() {
      // トグルボタンのアニメーション
      navToggle.classList.toggle('is-open');
      
      // メニューの表示/非表示（右からスライドイン）
      navMenu.classList.toggle('is-open');
      
      // オーバーレイの表示/非表示
      overlay.classList.toggle('is-open');
      
      // body のスクロールを無効化/有効化
      const isOpen = navToggle.classList.contains('is-open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      
      // アクセシビリティ用のaria-labelを更新
      navToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    });
    
    // オーバーレイをクリックしたら閉じる
    overlay.addEventListener('click', function() {
      closeMenu();
    });
    
    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navToggle.classList.contains('is-open')) {
        closeMenu();
      }
    });
    
    // メニューを閉じる関数
    function closeMenu() {
      navToggle.classList.remove('is-open');
      navMenu.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      navToggle.setAttribute('aria-label', 'メニューを開く');
    }
  }
}