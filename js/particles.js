/**
 * particles.js
 * Live particle network canvas animation
 */

const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');

const ACCENT_COLORS = ['#4f46e5', '#ec4899', '#06b6d4', '#f59e0b', '#818cf8'];

let W, H, particles;

/* ---------- Resize ---------- */
function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

/* ---------- Helpers ---------- */
function randColor() {
  return ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
}

/* ---------- Init ---------- */
function initParticles() {
  const count = Math.min(Math.floor(W * H / 14000), 90);
  particles = Array.from({ length: count }, () => ({
    x:     Math.random() * W,
    y:     Math.random() * H,
    vx:    (Math.random() - 0.5) * 0.5,
    vy:    (Math.random() - 0.5) * 0.5,
    r:     Math.random() * 2.5 + 1,
    color: randColor(),
    alpha: Math.random() * 0.5 + 0.3,
  }));
}
initParticles();

/* ---------- Draw loop ---------- */
function drawParticles() {
  ctx.clearRect(0, 0, W, H);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    // Move
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;

    // Draw dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle   = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();

    // Draw connecting lines to nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const q  = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 140) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle  = p.color;
        ctx.globalAlpha  = (1 - dist / 140) * 0.25;
        ctx.lineWidth    = 0.8;
        ctx.stroke();
      }
    }
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}

drawParticles();
