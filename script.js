/* AgriFluxus script.js — interactions & lightweight form handling */

// DOM helpers
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// Set some demo metrics (replace with live API later)
document.addEventListener('DOMContentLoaded', () => {
  if ($('#metric-time')) $('#metric-time').textContent = '45 min';
  if ($('#metric-spoil')) $('#metric-spoil').textContent = '30%+';
  if ($('#metric-deliveries')) $('#metric-deliveries').textContent = '1,200+';
  if ($('#metric-time-2')) $('#metric-time-2').textContent = '45 min';
  if ($('#metric-spoil-2')) $('#metric-spoil-2').textContent = '30%+';
});

// Smooth scroll for CTAs
document.addEventListener('click', (e) => {
  const t = e.target;
  if (t.matches('#downloadApp') || t.closest('#downloadApp') || t.matches('#downloadCTA')) {
    e.preventDefault();
    window.location.href = '#download-mock';
  }
  if (t.matches('.nav-link')) {
    // default anchor behavior ok
  }
});

// Lead form submission (client-side lightweight)
const leadForm = $('#leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('#name').value.trim();
    const phone = $('#phone').value.trim();
    const role = $('#role').value;
    if (!name || !phone) {
      alert('Please provide your name and phone number.');
      return;
    }
    const payload = { role, name, phone, ts: new Date().toISOString() };

    // show UX feedback
    const btn = leadForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      // TODO: Replace with your endpoint: Formspree / Zapier webhook / custom API
      const endpoint = 'https://example.com/api/waitlist'; // <<--- CHANGE THIS
      // Example: POST to your endpoint:
      // await fetch(endpoint, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });

      // For demo: local save
      const existing = JSON.parse(localStorage.getItem('agrifluxus_waitlist') || '[]');
      existing.push(payload);
      localStorage.setItem('agrifluxus_waitlist', JSON.stringify(existing));

      // analytics hook for later integration (GA4, Plausible)
      window.dispatchEvent(new CustomEvent('agrifluxus:lead', { detail: payload }));

      btn.textContent = 'Joined ✓';
      setTimeout(() => { btn.textContent = originalText; btn.disabled = false; leadForm.reset(); alert('Thanks — we will contact you about pilots & launch.'); }, 900);
    } catch (err) {
      console.error(err);
      alert('Submission failed. Try again later.');
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}

// Driver CTA
const driverCTA = document.getElementById('driverCTA');
if (driverCTA) {
  driverCTA.addEventListener('click', (e) => {
    e.preventDefault();
    // open mail to register drivers (replace email)
    window.location.href = 'mailto:drivers@agrifluxus.com?subject=Driver%20Registration';
  });
}

// Wholesale CTA
const wholesaleCTA = document.getElementById('inquireWholesale');
if (wholesaleCTA) {
  wholesaleCTA.addEventListener('click', () => {
    // mailto link handled in HTML; this is a place to open a modal in the future
  });
}

// Respect reduced-motion users (if you add animations later)
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // disable animations if required
}
