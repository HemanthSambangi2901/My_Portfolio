/**
 * main.js
 * Loading screen fade-out + hamburger menu toggle
 */

/* ===========================
   LOADER
   =========================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
  }, 2200);
});

/* ===========================
   HAMBURGER MENU
   =========================== */
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  if (navLinks) navLinks.classList.toggle('open');
}

// Close menu when a nav link is clicked (mobile UX)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) navLinks.classList.remove('open');
  });
});
