const typingTarget = document.getElementById("typing-text");
const words = ["AI", "DevOps", "Full Stack"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function runTypeCycle() {
  if (!typingTarget) return;

  const currentWord = words[wordIndex];

  if (isDeleting) {
    charIndex -= 1;
  } else {
    charIndex += 1;
  }

  typingTarget.textContent = currentWord.slice(0, charIndex);

  let delay = isDeleting ? 70 : 110;

  if (!isDeleting && charIndex === currentWord.length) {
    delay = 900;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 260;
  }

  window.setTimeout(runTypeCycle, delay);
}

runTypeCycle();

const animatedElements = Array.from(document.querySelectorAll("[data-animate]"));
const projectAnimated = Array.from(document.querySelectorAll('[data-animate="project"]'));
const skillAnimated = Array.from(document.querySelectorAll('[data-animate="skill"]'));

projectAnimated.forEach((element, index) => {
  element.style.setProperty("--animate-delay", `${index * 100}ms`);
});

skillAnimated.forEach((element, index) => {
  element.style.setProperty("--animate-delay", `${index * 50}ms`);
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  animatedElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  animatedElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  animatedElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

const header = document.querySelector(".navbar");
const heroSection = document.getElementById("hero");

if (header && heroSection) {
  const setHeaderState = (scrolled) => {
    header.classList.toggle("is-scrolled", scrolled);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderState(entry.intersectionRatio < 0.9);
      },
      {
        threshold: [0.9],
      }
    );
    observer.observe(heroSection);
  } else {
    window.addEventListener(
      "scroll",
      () => {
        setHeaderState(window.scrollY > 10);
      },
      { passive: true }
    );
  }
}

const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
for (const link of navLinks) {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();

    const offset = (header?.offsetHeight ?? 0) + 12;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });

    menuToggle?.classList.remove("is-open");
    siteNav?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
}

const menuToggle = document.querySelector(".navbar-toggle");
const siteNav = document.getElementById("navbar-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    siteNav.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      menuToggle.classList.remove("is-open");
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const ctaButton = document.querySelector(".button-hero-cta");
const projectsSection = document.getElementById("projects");

if (ctaButton && projectsSection) {
  ctaButton.addEventListener("click", (event) => {
    event.preventDefault();
    projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
