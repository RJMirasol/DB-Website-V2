// ─── PAGE SWITCHING WITH HISTORY API ───
function showPage(page, addToHistory = true) {
  document
    .querySelectorAll('.page-section')
    .forEach((s) => s.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('main-nav').classList.remove('open');

  // Update the URL hash so pages are bookmarkable and shareable
  if (addToHistory) {
    const url = page === 'home' ? '#' : '#' + page;
    history.pushState({ page }, '', url);
  }

  // Re-trigger fade-in animations for the new page
  setTimeout(() => {
    document.querySelectorAll('#page-' + page + ' .fade-in').forEach((el) => {
      el.classList.remove('visible');
      void el.offsetWidth;
    });
    observeAll();
  }, 50);
}

// ─── BACK / FORWARD BUTTON SUPPORT ───
window.addEventListener('popstate', (e) => {
  const page = e.state && e.state.page ? e.state.page : 'home';
  showPage(page, false); // false = already in history, don't push again
});

// ─── LOAD CORRECT PAGE FROM URL ON FIRST VISIT ───
// e.g. sharing site.html#contact opens the contact page directly
(function init() {
  const hash = window.location.hash.replace('#', '');
  const valid = ['home', 'about', 'practice', 'contact', 'privacy', 'terms'];
  const startPage = valid.includes(hash) ? hash : 'home';
  history.replaceState(
    { page: startPage },
    '',
    startPage === 'home' ? '#' : '#' + startPage,
  );
  showPage(startPage, false);
})();

// ─── STICKY HEADER ───
window.addEventListener('scroll', () => {
  document
    .getElementById('header')
    .classList.toggle('scrolled', window.scrollY > 40);
});

// ─── BURGER ───
function toggleNav() {
  document.getElementById('main-nav').classList.toggle('open');
}

// ─── SCROLL ANIMATIONS ───
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);

function observeAll() {
  document
    .querySelectorAll('.fade-in:not(.visible)')
    .forEach((el) => io.observe(el));
}
observeAll();
