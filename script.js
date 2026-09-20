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

const quoteForm = document.querySelector('#quote-form');
quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const note = document.querySelector('#form-note');
  note.textContent = 'The quote form is being connected. Please check back shortly.';
  note.setAttribute('role', 'status');
});
