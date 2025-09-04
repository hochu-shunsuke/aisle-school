// ヒーローセクションを読み込み
async function loadHero() {
  try {
    const response = await fetch('/components/ui/hero.html');
    const html = await response.text();
    
    const heroContainer = document.getElementById('hero-placeholder');
    if (heroContainer) {
      heroContainer.innerHTML = html;
      initializeHero();
    }
  } catch (error) {
    console.error('Hero load failed:', error);
  }
}

// ヒーローのスライドショー機能を初期化
function initializeHero() {
  // デモ用の画像URLs（実際の画像が用意されるまでのプレースホルダー）
  const images = [
    "/images/index/index-hero-1.png",
    "/images/index/index-hero-2.png",
    "/images/index/index-hero-3.png",
    "/images/index/index-hero-4.png"
  ];
  
  const heroSection = document.getElementById('hero-section');
  const indicatorsContainer = document.getElementById('hero-indicators');
  
  if (!heroSection || images.length === 0) return;
  
  let currentIndex = 0;
  
  // 背景画像要素を作成
  images.forEach((imagePath, index) => {
    const bgElement = document.createElement('div');
    bgElement.className = 'hero__bg';
    bgElement.style.backgroundImage = `url(${imagePath})`;
    if (index === 0) bgElement.classList.add('active');
    heroSection.appendChild(bgElement);
    
    // インジケーター作成
    const indicator = document.createElement('div');
    indicator.className = 'hero__indicator';
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });
  
  // 最初の画像で高さを設定
  setHeroHeight(images[0]);
  
  // スライドショー開始
  if (images.length > 1) {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updateActiveSlide();
    }, 5000);
  } else {
    indicatorsContainer.style.display = 'none';
  }
  
  function goToSlide(index) {
    currentIndex = index;
    updateActiveSlide();
  }
  
  function updateActiveSlide() {
    const bgElements = heroSection.querySelectorAll('.hero__bg');
    const indicators = indicatorsContainer.querySelectorAll('.hero__indicator');
    
    bgElements.forEach((bg, index) => {
      bg.classList.toggle('active', index === currentIndex);
    });
    
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }
  
  function setHeroHeight(imagePath) {
    const img = new Image();
    img.onload = function() {
      // スマホ表示時は画面幅を使用
      const containerWidth = window.innerWidth <= 768 ? window.innerWidth : heroSection.offsetWidth;
      const aspectRatio = this.height / this.width;
      const calculatedHeight = containerWidth * aspectRatio;
      heroSection.style.height = `${calculatedHeight}px`;
    };
    img.src = imagePath;
  }
  
  // ウィンドウリサイズ時に高さを再計算
  window.addEventListener('resize', () => {
    if (images.length > 0) {
      setHeroHeight(images[currentIndex]);
    }
  });
}

// DOM読み込み完了時にヒーローを読み込み
document.addEventListener('DOMContentLoaded', loadHero);
