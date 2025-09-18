const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const enterBtn = document.getElementById('enterBtn');
const brandEl = document.querySelector('.brand .glitch');

function splitTitleIntoChars() {
  if (!brandEl) return;
  const text = brandEl.textContent || '';
  const frag = document.createDocumentFragment();
  brandEl.textContent = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = ch;
    frag.appendChild(span);
  }
  brandEl.appendChild(frag);
  brandEl.parentElement?.classList.add('split');
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function runEntryAnimation() {
  const brandContainer = brandEl?.parentElement;
  if (!brandEl || !brandContainer) return;

  document.body.classList.add('entering');
  brandContainer.classList.add('animating');

  const chars = Array.from(brandEl.querySelectorAll('.char'));
  const totalDurationMs = 10000; // 10 seconds
  const breakPhase = 0.35; // 35% time breaking apart
  const holdPhase = 0.20;  // 20% time scattered
  const reformPhase = 0.45; // 45% time reforming

  const breakEnd = totalDurationMs * breakPhase;
  const holdEnd = totalDurationMs * (breakPhase + holdPhase);
  const reformEnd = totalDurationMs;

  // Initial: break apart
  chars.forEach((c, idx) => {
    const angle = randomRange(0, Math.PI * 2);
    const radius = randomRange(20, 120);
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius - randomRange(0, 30);
    const rot = randomRange(-25, 25);
    const delay = randomRange(0, breakEnd * 0.4);

    c.animate([
      { transform: 'translate(0,0) rotate(0deg)', filter: 'blur(0px)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, filter: 'blur(1px)', opacity: 0.85 }
    ], { duration: breakEnd, delay, easing: 'cubic-bezier(0.22,0.61,0.36,1)', fill: 'forwards' });
  });

  // Hold scattered state (slight jitter)
  setTimeout(() => {
    chars.forEach((c) => {
      const jitterX = randomRange(-6, 6);
      const jitterY = randomRange(-6, 6);
      c.animate([
        { transform: getComputedStyle(c).transform, filter: 'blur(1px)' },
        { transform: `translate(${jitterX}px, ${jitterY}px)`, filter: 'blur(1.6px)' },
      ], { duration: holdEnd - breakEnd, easing: 'ease-in-out', direction: 'alternate', iterations: 2, fill: 'forwards' });
    });
  }, breakEnd);

  // Reform to original positions
  setTimeout(() => {
    chars.forEach((c) => {
      const current = getComputedStyle(c).transform;
      c.animate([
        { transform: current, filter: 'blur(1.6px)', opacity: 0.9 },
        { transform: 'translate(0,0) rotate(0deg)', filter: 'blur(0px)', opacity: 1 }
      ], { duration: reformEnd - holdEnd, easing: 'cubic-bezier(0.22,0.61,0.36,1)', fill: 'forwards' });
    });
  }, holdEnd);

  // Cleanup and return to idle state
  setTimeout(() => {
    document.body.classList.remove('entering');
    brandContainer.classList.remove('animating');
    brandContainer.classList.add('idle');
  }, reformEnd + 50);
}

// Prepare split letters on load
splitTitleIntoChars();

if (enterBtn) {
  enterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    runEntryAnimation();
  });
}


