// Mobile menu toggle
const burger = document.querySelector('.burger');
const mobileNav = document.querySelector('.mobile-nav');
if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

// Header shadow on scroll
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

// Project filter tabs (projects page)
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('[data-category]');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      galleryItems.forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.category === cat) ? '' : 'none';
      });
    });
  });
}

// Contact form (demo — sem backend real)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('form-success').classList.add('show');
    contactForm.reset();
    contactForm.style.display = 'none';

    // Conversão: envio de formulário
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', { 'send_to': 'AW-CONVERSION_ID/FORM_LABEL' });
      gtag('event', 'generate_lead');
    }
    if (typeof fbq === 'function') {
      fbq('track', 'Lead');
    }
  });
}

// Conversão: clique em qualquer link de telefone (tel:)
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', { 'send_to': 'AW-CONVERSION_ID/CALL_LABEL' });
      gtag('event', 'phone_click');
    }
    if (typeof fbq === 'function') {
      fbq('track', 'Contact');
    }
  });
});

// Evento: clique em "Get a Free Estimate" (visualiza interesse, não é conversão final)
document.querySelectorAll('a.btn').forEach(btn => {
  if (btn.textContent.includes('Free Estimate')) {
    btn.addEventListener('click', () => {
      if (typeof gtag === 'function') gtag('event', 'select_content', { content_type: 'cta_estimate' });
      if (typeof fbq === 'function') fbq('trackCustom', 'EstimateCtaClick');
    });
  }
});
