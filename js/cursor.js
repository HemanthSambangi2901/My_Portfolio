/**
 * cursor.js
 * Custom glowing cursor dot + trailing ring
 */

const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

let mx = 0, my = 0;   // mouse position
let rx = 0, ry = 0;   // ring (lagging) position

/* ---- Track mouse ---- */
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

/* ---- Smooth ring animation ---- */
function animateCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ---- Hover scale on interactive elements ---- */
const interactiveSelectors = [
  'a', 'button',
  '.chip', '.course-chip',
  '.project-card', '.exp-card', '.contact-card',
].join(', ');

document.querySelectorAll(interactiveSelectors).forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width       = '56px';
    ring.style.height      = '56px';
    ring.style.borderColor = 'rgba(79, 70, 229, 0.8)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width       = '36px';
    ring.style.height      = '36px';
    ring.style.borderColor = 'rgba(236, 72, 153, 0.6)';
  });
});
