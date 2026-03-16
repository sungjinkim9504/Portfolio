// 페이지 로드 완료
document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ 포트폴리오 페이지 로드 완료');
  
  // 모든 기능 초기화
  initSmoothScroll();
  initScrollAnimations();
  initCountUpAnimation();
});

// ===== 부드러운 스크롤 =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===== 스크롤 기반 애니메이션 =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Impact Cards
        if (entry.target.classList.contains('impact-card')) {
          entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
          entry.target.style.animationDelay = 
            Array.from(entry.target.parentElement.children)
              .indexOf(entry.target) * 0.1 + 's';
        }
        
        // Case Study Cards
        if (entry.target.classList.contains('case-study-card')) {
          entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
          entry.target.style.animationDelay = 
            Array.from(entry.target.parentElement.children)
              .filter(el => el.classList.contains('case-study-card'))
              .indexOf(entry.target) * 0.15 + 's';
        }
        
        // Service Cards
        if (entry.target.classList.contains('service-card')) {
          entry.target.style.animation = 'fadeInScale 0.6s ease-out forwards';
          entry.target.style.animationDelay = 
            Array.from(entry.target.parentElement.children)
              .indexOf(entry.target) * 0.1 + 's';
        }
        
        // Stats Items
        if (entry.target.classList.contains('stat-item')) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
          entry.target.style.animationDelay = 
            Array.from(entry.target.parentElement.children)
              .indexOf(entry.target) * 0.1 + 's';
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // 애니메이션할 요소들
  document.querySelectorAll(
    '.impact-card, .case-study-card, .service-card, .stat-item'
  ).forEach(el => observer.observe(el));
}

// ===== 카운트업 애니메이션 =====
function initCountUpAnimation() {
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statValue = entry.target.querySelector('.stat-value');
        if (statValue && !entry.target.dataset.animated) {
          const finalValue = statValue.textContent;
          
          // 숫자만 추출
          const numericValue = parseInt(finalValue.replace(/\D/g, ''));
          
          if (!isNaN(numericValue)) {
            animateCountUp(statValue, numericValue, finalValue);
            entry.target.dataset.animated = 'true';
          }
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.stat-item').forEach(el => observer.observe(el));
}

function animateCountUp(element, finalValue, displayValue) {
  const duration = 1500;
  const steps = 30;
  const increment = finalValue / steps;
  let current = 0;
  const startTime = performance.now();
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    current = Math.floor(increment * steps * progress);
    
    // 원래 포맷 유지
    if (displayValue.includes('%')) {
      element.textContent = current + '%';
    } else if (displayValue.includes('억')) {
      element.textContent = (current / 100).toFixed(0) + '억 원';
    } else if (displayValue.includes('년')) {
      element.textContent = Math.ceil(progress * finalValue) + '년';
    } else {
      element.textContent = current + '+';
    }
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = displayValue;
    }
  }
  
  requestAnimationFrame(animate);
}

// ===== CSS 애니메이션 정의 =====
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ===== 로그 =====
console.log('%c🎨 마케터 포트폴리오', 'color: #2563EB; font-size: 16px; font-weight: bold;');
console.log('✨ 포트폴리오 준비 완료!');