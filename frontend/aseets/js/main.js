
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const icon = btn.querySelector('i');
  const text = btn.querySelector('span');

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    if (t === 'dark') {
      icon.className = 'bi bi-sun-fill';
      text.textContent = 'Light';
    } else {
      icon.className = 'bi bi-moon-stars';
      text.textContent = 'Dark';
    }
    localStorage.setItem('ahc-theme', t);
  }

  const saved = localStorage.getItem('ahc-theme')
    || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
})();

document.addEventListener('click', e => {
  const trigger = e.target.closest('[data-bs-target="#quoteModal"]');
  if (!trigger) return;
  const plan = trigger.getAttribute('data-plan');
  const heroZip = document.getElementById('heroZip');
  const modalPlan = document.getElementById('modalPlan');
  const modalZip = document.getElementById('modalZip');

  if (modalPlan) modalPlan.value = plan || '';
  if (heroZip && heroZip.value && modalZip) modalZip.value = heroZip.value;
});

document.getElementById('quoteForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const modalEl = document.getElementById('quoteModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
  alert('Thank you! Your quote request has been submitted.');
});


(function () {
  const overlay = document.getElementById('ahc-offer-popup');
  const closeBtn = document.querySelector('.ahc-popup-close');
  const form = document.getElementById('ahc-popup-form');
  const zipInput = document.getElementById('ahc-popup-zip');

  function showPopup() {
    if (!overlay) return;
    if (localStorage.getItem('ahc_popup_closed') === '1') return;
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function hidePopup() {
    if (!overlay) return;
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    localStorage.setItem('ahc_popup_closed', '1');
  }

  window.addEventListener('load', function () {
    setTimeout(showPopup, 9000);
  });

  if (closeBtn) closeBtn.addEventListener('click', hidePopup);
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) hidePopup();
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const zip = zipInput.value.trim();
      if (!zip) return;
      hidePopup();
    });
  }
})();


$(document).ready(function () {
  $('.brand-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    dots: false,
    pauseOnHover: false,
    prevArrow: '<button type="button" class="slick-prev">&#10094;</button>',
    nextArrow: '<button type="button" class="slick-next">&#10095;</button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          arrows: false
        }
      }
    ]
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Hide preloader (with fade-out if you have CSS transition)
  function hidePreloader() {
    if (!preloader.classList.contains('ahc-preloader-hidden')) {
      preloader.classList.add('ahc-preloader-hidden');
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      preloader.style.pointerEvents = 'none';
    }
  }

  // 1) Hide as soon as DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    // hidePreloader();
  });

  // 2) Safety: force hide after max 3s even if something blocks
  setTimeout(hidePreloader, 3000);
})();

document.addEventListener('DOMContentLoaded', function () {
  const lazyImages = document.querySelectorAll('img[data-lazy]');
  if (!lazyImages.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-lazy');
          if (src) {
            img.src = src;
            img.setAttribute('loading', 'lazy');
            img.removeAttribute('data-lazy');
          }
          obs.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px',
      threshold: 0.01
    });

    lazyImages.forEach(img => observer.observe(img));
  } else {
    // Fallback for very old browsers
    lazyImages.forEach(img => {
      const src = img.getAttribute('data-lazy');
      if (src) {
        img.src = src;
        img.removeAttribute('data-lazy');
      }
    });
  }
});
