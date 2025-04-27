// DOM 요소 로딩 확인
document.addEventListener("DOMContentLoaded", function () {
  // 스무스 스크롤 네비게이션
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });

  // 스크롤 시 헤더 스타일 변경
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.backgroundColor = "#fff";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
    }
  });

  // 앱 스크린샷 슬라이더 구현
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;
  const slideCount = slides.length;

  // 슬라이드 이동 함수
  function moveToSlide(index) {
    if (index < 0) {
      currentIndex = slideCount - 1;
    } else if (index >= slideCount) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // 슬라이더 이동
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // 도트 활성화 업데이트
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  // 이벤트 리스너 추가
  prevBtn.addEventListener("click", () => {
    moveToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    moveToSlide(currentIndex + 1);
  });

  // 도트 클릭 이벤트
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      moveToSlide(index);
    });
  });

  // 자동 슬라이드 (선택적)
  let slideInterval = setInterval(() => {
    moveToSlide(currentIndex + 1);
  }, 5000);

  // 슬라이더에 마우스 올리면 자동 슬라이드 멈춤
  const sliderContainer = document.querySelector(".slider-container");

  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    sliderContainer.addEventListener("mouseleave", () => {
      slideInterval = setInterval(() => {
        moveToSlide(currentIndex + 1);
      }, 5000);
    });
  }

  // 특징 카드 애니메이션
  const featureCards = document.querySelectorAll(".feature-card");
  const testimonialCards = document.querySelectorAll(".testimonial-card");

  // 화면에 요소가 보일 때 애니메이션 추가
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 초기 스타일 설정 및 관찰 시작
  featureCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });

  // 후기 카드에도 동일한 애니메이션 적용
  testimonialCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });

  // CTA 버튼 클릭 이벤트 - 앱 스토어 링크
  const ctaButtons = document.querySelectorAll(".cta-button");

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // 임시로 알림 표시
      // 실제로는 각 버튼에 해당하는 앱 스토어 링크로 이동
      const isAppStore = this.textContent.includes("App Store");
      alert(
        isAppStore
          ? "App Store로 이동합니다. 실제 앱에서는 App Store 링크로 연결됩니다."
          : "Google Play로 이동합니다. 실제 앱에서는 Google Play 링크로 연결됩니다."
      );
      e.preventDefault();
    });
  });
});
