/* ===========================
   NIRANJAN MORAKKATTE PORTFOLIO
   script.js
   =========================== */

/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

let mx = 0, my = 0;   // mouse position
let rx = 0, ry = 0;   // ring position (lagged)

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  // Dot follows instantly
  cursor.style.left = (mx - 6) + 'px';
  cursor.style.top  = (my - 6) + 'px';

  // Ring follows with easing
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = (rx - 18) + 'px';
  ring.style.top  = (ry - 18) + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor grow on interactive elements
document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    ring.style.transform   = 'scale(1.4)';
    ring.style.opacity     = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    ring.style.transform   = 'scale(1)';
    ring.style.opacity     = '0.5';
  });
});

/* ── Contact Form Submit ── */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    // Visual feedback
    submitBtn.textContent        = 'Message Sent ✓';
    submitBtn.style.background   = '#39ff14';
    submitBtn.style.boxShadow    = '0 0 30px rgba(57,255,20,0.5)';

    // Reset after 3 seconds
    setTimeout(() => {
      submitBtn.textContent      = 'Send Message ↗';
      submitBtn.style.background = '';
      submitBtn.style.boxShadow  = '';
      contactForm.reset();
    }, 3000);
  });
}

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

// Apply initial hidden state and observe
document.querySelectorAll('.project-card, .skill-category, .stat-card').forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
  revealObserver.observe(el);
});

/* ── Active Nav Highlight on Scroll ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
      });
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--cyan)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
