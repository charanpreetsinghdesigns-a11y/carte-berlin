/* Loop — micro-interactions */
(function () {
  'use strict';

  // Flag the document as JS-enabled so CSS can apply reveal styles.
  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supportsIO = 'IntersectionObserver' in window;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  // ---------- Scroll reveal ----------
  function setupReveal() {
    var els = document.querySelectorAll('[data-animate]');
    if (!els.length) return;

    // Reduced motion or no IO support: show immediately.
    if (prefersReduced || !supportsIO) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  // ---------- Stat counters ----------
  function animateCounter(el) {
    var raw = (el.textContent || '').trim();
    var m = raw.match(/^(\d+)([\s\S]*)$/);
    if (!m) return;
    var target = parseInt(m[1], 10);
    var suffix = m[2] || '';
    var duration = 1400;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / duration);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - t, 3);
      var current = Math.round(target * eased);
      el.textContent = current + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function setupCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    if (prefersReduced || !supportsIO) return; // Leave the original number in place.

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { io.observe(el); });
  }

  // ---------- In-page smooth scroll for hash links ----------
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!href || href === '#' || href.length < 2) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReduced ? 'auto' : 'smooth',
          block: 'start'
        });
      });
    });
  }

  // ---------- Header shadow on scroll ----------
  function setupNavShadow() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var ticking = false;
    function update() {
      ticking = false;
      if (window.scrollY > 8) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  ready(function () {
    setupReveal();
    setupCounters();
    setupSmoothScroll();
    setupNavShadow();
  });
})();
