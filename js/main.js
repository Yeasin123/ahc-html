
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
    setTimeout(showPopup, 5000);
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

window.addEventListener("load", function () {
  const loader = document.getElementById("preloader");
  if (!loader) return;
  loader.classList.add("hide");
  setTimeout(() => loader.remove(), 1000);
});

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

