// ─── Scroll Reveal (IntersectionObserver) ───
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        const siblingIndex = Array.from(siblings).indexOf(entry.target);
        entry.target.style.transitionDelay = `${siblingIndex * 80}ms`;
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
revealElements.forEach((el) => revealObserver.observe(el));

// ─── Nav Scroll State ───
const nav = document.getElementById('nav');

function updateNav() {
  if (window.scrollY > 50) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ─── Active Link Tracking ───
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle(
            'nav__link--active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  },
  { threshold: 0.3, rootMargin: '-72px 0px 0px 0px' }
);
sections.forEach((section) => sectionObserver.observe(section));

// ─── Mobile Menu Toggle ───
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.toggle('mobile-menu--open');
  navToggle.classList.toggle('nav__toggle--open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

navToggle.addEventListener('click', toggleMobileMenu);

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (mobileMenu.classList.contains('mobile-menu--open')) {
      toggleMobileMenu();
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--open')) {
    toggleMobileMenu();
  }
});

// ─── Smooth Scroll for Anchor Links ───
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ─── Dynamic Footer Year ───
document.getElementById('footerYear').textContent = new Date().getFullYear();
