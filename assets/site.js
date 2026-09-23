document.documentElement.classList.add('js');

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', e => {
    if (e.target.closest('a')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Solid header once the page scrolls
const nav = document.querySelector('.nav');
const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, {passive: true});
onScroll();

// Shade / Unshade demo: plays by itself until the visitor presses a button
const demo = document.querySelector('.demo');
if (demo) {
  const buttons = demo.querySelectorAll('[data-set]');
  const setState = state => {
    demo.dataset.state = state;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.set === state)));
  };
  let timer = null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoplay = () => {
    if (reduced || timer) return;
    setState('unshaded');
    timer = setInterval(() => setState(demo.dataset.state === 'shaded' ? 'unshaded' : 'shaded'), 3200);
  };
  buttons.forEach(b => b.addEventListener('click', () => {
    clearInterval(timer);
    timer = -1;
    setState(b.dataset.set);
  }));
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries, obs) => {
      if (entries.some(e => e.isIntersecting)) {
        autoplay();
        obs.disconnect();
      }
    }, {threshold: 0.5}).observe(demo);
  }
}

// Gentle fade-in of sections as they come into view
const revealTargets = document.querySelectorAll('.section-head, .split > *, .heat > *, .compare-card, .steps li, .feature, .mcard, .gap, .table-scroll, .timeline, .investors > *, .patent, .business > *, .cta, .piston');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -40px 0px'});
  revealTargets.forEach(el => {
    el.classList.add('reveal');
    io.observe(el);
  });
}
