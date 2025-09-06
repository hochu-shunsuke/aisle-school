// ヒーローのスライドショー機能
function initializeHero() {
  const hero = document.getElementById('hero-section');
  const bgElements = hero.querySelectorAll('.hero__bg');
  const indicators = hero.querySelectorAll('.hero__indicator');
  
  if (!hero || bgElements.length === 0) return;
  
  let currentIndex = 0;
  
  // インジケーターのクリックイベント
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateSlide();
    });
  });
  
  // 自動スライドショー
  setInterval(() => {
    currentIndex = (currentIndex + 1) % bgElements.length;
    updateSlide();
  }, 5000);
  
  function updateSlide() {
    bgElements.forEach((bg, index) => {
      bg.classList.toggle('active', index === currentIndex);
    });
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }
  
  // 高さ設定（最初の画像から取得）
  const firstBg = bgElements[0];
  const bgImageUrl = firstBg.style.backgroundImage.slice(5, -2); // url("...") から ... を抽出
  
  const img = new Image();
  img.onload = () => {
    const width = window.innerWidth <= 768 ? window.innerWidth : hero.offsetWidth;
    hero.style.height = `${width * (img.height / img.width)}px`;
  };
  img.src = bgImageUrl;
  
  // リサイズ対応
  window.addEventListener('resize', () => {
    const width = window.innerWidth <= 768 ? window.innerWidth : hero.offsetWidth;
    hero.style.height = `${width * (img.height / img.width)}px`;
  });
}

document.addEventListener('DOMContentLoaded', initializeHero);
