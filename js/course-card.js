// 講座カードのトピック開閉機能
document.addEventListener('DOMContentLoaded', function() {
  initializeCourseCards();
});

function initializeCourseCards() {
  const topicHeaders = document.querySelectorAll('.topic-card__header');
  
  topicHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const topicCard = this.closest('.topic-card');
      
      // 他のトピックカードを閉じる（同じcourse-card内の）
      const courseCard = topicCard.closest('.course-card');
      const otherTopicCards = courseCard.querySelectorAll('.topic-card');
      otherTopicCards.forEach(card => {
        if (card !== topicCard) {
          card.classList.remove('is-open');
        }
      });
      
      // クリックされたトピックカードの開閉を切り替え
      topicCard.classList.toggle('is-open');
    });
  });
}// 外部クリックで閉じる機能
document.addEventListener('click', function(event) {
  if (!event.target.closest('.topic-card')) {
    const openTopicCards = document.querySelectorAll('.topic-card.is-open');
    openTopicCards.forEach(card => {
      card.classList.remove('is-open');
    });
  }
});
