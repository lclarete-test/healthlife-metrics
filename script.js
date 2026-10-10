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
  window.startHealthLifePosthog?.();
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
const quoteEndpoint = 'https://script.google.com/macros/s/AKfycbxVAemv9TkNnV4XiVVywkcNahWnj4j4FBW0L8CQSnf8GnQHmATQcMalh9w-L8XTnr8E/exec';

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

    if (window.__sitePosthogStarted) window.posthog?.capture('quote_request_submit');
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


const whitepaperForm = document.querySelector('#whitepaper-form');
whitepaperForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const note = document.querySelector('#whitepaper-note');
  const downloadLink = document.querySelector('#whitepaper-download');
  const button = whitepaperForm.querySelector('button[type="submit"]');
  const payload = Object.fromEntries(new FormData(whitepaperForm));
  payload.marketing_consent = whitepaperForm.querySelector('[name="marketing_consent"]')?.checked ? 'yes' : 'no';
  note.textContent = 'Preparing your report...';
  button.disabled = true;
  try {
    await fetch(quoteEndpoint, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    if (window.__sitePosthogStarted) window.posthog?.capture('whitepaper_lead_submit', {report: 'hcp_digital_profiling'});
    whitepaperForm.reset();
    note.textContent = 'Your report is ready.';
    downloadLink.hidden = false;
    downloadLink.focus();
    if (typeof window.gtag === 'function') window.gtag('event', 'whitepaper_lead', { report: 'hcp_digital_profiling' });
  } catch (error) {
    note.textContent = 'We could not prepare the report. Please try again.';
  } finally {
    button.disabled = false;
  }
});


const exploreWorkLink = document.querySelector('a[href="#evidence-menu"]');
const evidenceMenu = document.querySelector('#evidence-menu');

exploreWorkLink?.addEventListener('click', (event) => {
  event.preventDefault();
  if (!evidenceMenu) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  evidenceMenu.scrollIntoView({
    behavior: reducedMotion ? 'auto' : 'smooth',
    block: 'center'
  });
  window.history.replaceState(null, '', '#evidence-menu');
});
