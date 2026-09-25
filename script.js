const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
const searchToggle = document.getElementById('search-toggle');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem('theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content',
    theme === 'light' ? '#f6f8fc' : '#080b14',
  );
}

try {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
} catch {
  // Storage can be unavailable in privacy-restricted browser contexts.
}

function updateThemeButton() {
  if (!themeToggle) return;

  const light = root.dataset.theme === 'light';
  const label = light ? 'Switch to dark theme' : 'Switch to light theme';
  themeToggle.setAttribute('aria-label', label);
  themeToggle.title = label;
  themeToggle.innerHTML = `<i class="fa-solid fa-${light ? 'moon' : 'sun'}" aria-hidden="true"></i>`;
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    updateThemeButton();
  });
}

function closeNavigation() {
  if (!mainNav || !navToggle) return;

  mainNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
  navToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
}

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navToggle.innerHTML = `<i class="fa-solid fa-${open ? 'xmark' : 'bars'}" aria-hidden="true"></i>`;
  });

  document.querySelectorAll('#main-nav a').forEach((link) => {
    link.addEventListener('click', closeNavigation);
  });

  document.addEventListener('click', (event) => {
    if (
      mainNav.classList.contains('is-open') &&
      !mainNav.contains(event.target) &&
      !navToggle.contains(event.target)
    ) closeNavigation();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mainNav.classList.contains('is-open')) {
      closeNavigation();
      navToggle.focus();
    }
  });

  const closeOnDesktop = (event) => {
    if (event.matches) closeNavigation();
  };
  const mediaQuery = window.matchMedia('(min-width: 761px)');
  if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', closeOnDesktop);
  else mediaQuery.addListener(closeOnDesktop);
}

if (searchToggle) {
  searchToggle.addEventListener('click', () => {
    document.getElementById('skills')?.scrollIntoView({
      behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
    });
    searchToggle.blur();
  });
}

if (scrollToTopBtn) {
  const updateScrollButton = () => {
    scrollToTopBtn.classList.toggle('visible', window.scrollY > 300);
  };
  window.addEventListener('scroll', updateScrollButton, { passive: true });
  updateScrollButton();

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
  });
}

updateThemeButton();

document.getElementById('year')?.replaceChildren(String(new Date().getFullYear()));

const revealElements = document.querySelectorAll('.reveal');
if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  revealElements.forEach((element) => observer.observe(element));
}

const sectionLinks = [...document.querySelectorAll('#main-nav a[data-section]')];
const sections = sectionLinks
  .map((link) => document.getElementById(link.dataset.section))
  .filter(Boolean);

if ('IntersectionObserver' in window && sectionLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      sectionLinks.forEach((link) => {
        const active = link.dataset.section === entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });

  sections.forEach((section) => sectionObserver.observe(section));
}
