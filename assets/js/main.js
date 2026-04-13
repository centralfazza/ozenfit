document.addEventListener('DOMContentLoaded', function() {
  // 1. FAQ Accordion Logic
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const parent = question.parentElement;
      const isActive = parent.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });

  // 2. Scroll Reveal Animation Logic
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: stop observing after reveal
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Stock Counter Logic
  (function() {
    var stockEl = document.getElementById('stock-counter');
    if (!stockEl) return;

    var key = 'ozenfit_stock';
    var tsKey = 'ozenfit_stock_ts';
    var now = Date.now();
    var stored = localStorage.getItem(key);
    var storedTs = localStorage.getItem(tsKey);

    // Reset a cada 24h
    if (!stored || !storedTs || (now - parseInt(storedTs)) > 86400000) {
      stored = Math.floor(Math.random() * 10) + 18; // 18 a 27
      localStorage.setItem(key, stored);
      localStorage.setItem(tsKey, now);
    }

    stockEl.textContent = stored;

    // Reduz 1 unidade a cada 3-7 minutos
    setInterval(function() {
      var current = parseInt(localStorage.getItem(key)) || 23;
      if (current > 3) {
        current--;
        localStorage.setItem(key, current);
        stockEl.textContent = current;
      }
    }, (Math.floor(Math.random() * 4) + 3) * 60000);
  })();

  // 5. UTM Propagation Script (PRESERVED)
  (function() {
    const utmParamQueryString = new URLSearchParams(window.location.search);
    if (utmParamQueryString.toString()) {
      var navLinks = document.querySelectorAll('a');
      navLinks.forEach(function(item) {
        const domains = [
          'https://ev.braip.com',
          'https://app.monetizze.com.br',
          'https://secure.doppus.com/',
          'https://enxablock.carrinho.app/'
        ];

        let match = false;
        domains.forEach(function(domain) {
          if (item.href.indexOf(domain) !== -1) {
            match = true;
          }
        });

        if (match) {
          if (item.href.indexOf('?') === -1) {
            item.href += '?' + utmParamQueryString.toString();
          } else {
            item.href += '&' + utmParamQueryString.toString();
          }
        }
      });
    }
  })();
});
