/* ================================================
   ESSENTIAL IMPULSO — Script
   Step Up Business Solutions
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. Año automático */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* 2. Header scroll */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* 3. Scroll spy */
  const navLinks = document.querySelectorAll('.header__nav-link');
  const sections = [];
  navLinks.forEach(link => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) sections.push({ el: target, link });
  });

  window.addEventListener('scroll', () => {
    const pos = window.scrollY + 120;
    sections.forEach(({ el, link }) => {
      link.classList.toggle('active', pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight);
    });
  }, { passive: true });

  /* 4. Menú móvil */
  const menuToggle = document.getElementById('menuToggle');
  const headerNav = document.getElementById('headerNav');

  function closeMenu() {
    headerNav.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = headerNav.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    });
    headerNav.querySelectorAll('.header__nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    headerNav.addEventListener('click', (e) => {
      if (e.target === headerNav) closeMenu();
    });
  }

  /* 5. Animaciones de entrada */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* 6. Ocultar beneficios vacíos (4 y 5 son opcionales) */
  document.querySelectorAll('[data-benefit]').forEach(card => {
    const title = card.querySelector('.benefits__card-title');
    if (title) {
      const text = title.textContent.trim();
      if (!text || /^\{\{.*\}\}$/.test(text)) {
        card.style.display = 'none';
      }
    }
  });

});
