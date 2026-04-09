/* ══════════════════════════════════════════
   PM SHRI GOVT SECONDARY SCHOOL – SCRIPT
══════════════════════════════════════════ */

// 1. CAROUSEL FUNCTION (Global scope for onclick access)
let currentSlide = 0;
window.moveCarousel = function(step) {
  const track = document.getElementById('galleryTrack');
  if (!track) return;
  const slidesCount = track.children.length;
  currentSlide = (currentSlide + step + slidesCount) % slidesCount;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
};

document.addEventListener('DOMContentLoaded', () => {
  
  // 2. LANGUAGE TOGGLE LOGIC
  let currentLang = localStorage.getItem('preferredLang') || 'en';
  applyLang(currentLang);
  updateLangButton();

  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'hi' : 'en';
      localStorage.setItem('preferredLang', currentLang);
      applyLang(currentLang);
      updateLangButton();
    });
  }

  function applyLang(lang) {
    const attr = 'data-' + lang;
    document.querySelectorAll('[data-en]').forEach(el => {
      const val = el.getAttribute(attr);
      if (val) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.innerHTML = val;
        }
      }
    });
    
    document.body.style.fontFamily = lang === 'hi'
      ? "'Noto Sans Devanagari', 'Noto Sans', sans-serif"
      : "'Noto Sans', 'Noto Sans Devanagari', sans-serif";
  }

  function updateLangButton() {
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = currentLang === 'en' ? 'हिंदी' : 'English';
  }

  // 3. MOBILE MENU TOGGLE
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('navList');
  
  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      navList.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
      });
    });
  }

  // 4. ENTRANCE ANIMATIONS (Fade Up)
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  // 5. CAROUSEL AUTO-PLAY
  setInterval(() => {
    if (document.getElementById('galleryTrack')) {
      window.moveCarousel(1);
    }
  }, 4000);

  // 6. MICRO-INTERACTIONS: BUTTON RIPPLE EFFECT
  const buttons = document.querySelectorAll('.btn, .lang-btn, .social-btn, .carousel-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      let ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      let x = e.clientX - e.target.getBoundingClientRect().left;
      let y = e.clientY - e.target.getBoundingClientRect().top;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      setTimeout(() => { ripple.remove(); }, 600);
    });
  });

  // 7. MICRO-INTERACTIONS: MAGNETIC EFFECT (FIXED MATH)
  const magnets = document.querySelectorAll('.magnetic');
  magnets.forEach(magnet => {
    magnet.addEventListener('mousemove', (e) => {
      const position = magnet.getBoundingClientRect();
      // Use clientX and clientY to ignore page scroll interference
      const x = e.clientX - (position.left + position.width / 2);
      const y = e.clientY - (position.top + position.height / 2);
      magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });
    magnet.addEventListener('mouseout', () => {
      magnet.style.transform = 'translate(0px, 0px)';
    });
  });
});