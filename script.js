const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const enterBtn = document.getElementById('enterBtn');
if (enterBtn) {
  enterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.add('entering');
    // Future: navigate to sections or other pages.
  });
}


