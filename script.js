const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const analyticsMeasurementId = 'G-WQLZD8W6J2';
const analyticsPreferenceKey = 'healthlife-analytics-consent';
const cookieBanner = document.querySelector('#cookie-banner');

const startAnalytics = () => {
  if (window.dataLayer) return;

  window.dataLayer = [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', analyticsMeasurementId, { anonymize_ip: true });

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsMeasurementId}`;
  document.head.appendChild(tag);
};

const analyticsPreference = localStorage.getItem(analyticsPreferenceKey);
if (analyticsPreference === 'accepted') {
  startAnalytics();
} else if (!analyticsPreference) {
  cookieBanner.hidden = false;
}

document.querySelector('#analytics-accept')?.addEventListener('click', () => {
  localStorage.setItem(analyticsPreferenceKey, 'accepted');
  cookieBanner.hidden = true;
  startAnalytics();
});

document.querySelector('#analytics-decline')?.addEventListener('click', () => {
  localStorage.setItem(analyticsPreferenceKey, 'declined');
  cookieBanner.hidden = true;
});

const quoteForm = document.querySelector('#quote-form');
const quoteEndpoint = 'https://script.google.com/macros/s/AKfycbzfQS4IZp0P9cbbh5nMgbvd_oHN02xjrEApnqRhY5F9hvy_-taCaqj5TffZw5X1Bxmg/exec';

quoteForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const note = document.querySelector('#form-note');
  const button = quoteForm.querySelector('button[type="submit"]');
  const payload = Object.fromEntries(new FormData(quoteForm));

  note.setAttribute('role', 'status');
  note.textContent = 'Sending your request...';
  button.disabled = true;

  try {
    await fetch(quoteEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });

    quoteForm.reset();
    note.textContent = 'Thank you. Your request has been sent. We will be in touch soon.';

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'quote_request', { product: payload.product });
    }
  } catch (error) {
    note.textContent = 'We could not send your request. Please try again.';
  } finally {
    button.disabled = false;
  }
});
