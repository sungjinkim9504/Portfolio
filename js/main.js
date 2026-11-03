// 수업 카드 분야별 보기
const filters = document.querySelectorAll(".filter");
const courses = document.querySelectorAll(".course");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const area = button.dataset.filter;

    filters.forEach((b) => {
      const on = b === button;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", String(on));
    });

    courses.forEach((course) => {
      course.hidden = area !== "all" && course.dataset.area !== area;
    });
  });
});

// 스크롤 위치에 맞춰 상단 메뉴 강조
const navLinks = document.querySelectorAll(".topbar__nav a");
const sections = [...navLinks].map((a) => document.querySelector(a.getAttribute("href")));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        a.classList.toggle("is-on", a.getAttribute("href") === "#" + entry.target.id);
      });
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => section && observer.observe(section));
