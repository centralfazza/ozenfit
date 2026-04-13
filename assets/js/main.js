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
        item.querySelector('.icon').textContent = '+';
      });
      
      // Toggle current
      if (!isActive) {
        parent.classList.add('active');
        question.querySelector('.icon').textContent = '-';
      }
    });
  });

  // 2. Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 80; // adjusted for fixed bar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. UTM Propagation Script
  (function() {
    const utmParamQueryString = new URLSearchParams(window.location.search);
    if (utmParamQueryString.toString()) {
      var navLinks = document.querySelectorAll('a');
      navLinks.forEach(function(item) {
        const domains = ['https://app.monetizze.com.br', 'https://ev.braip.com', 'https://secure.doppus.com/', 'https://enxablock.carrinho.app/'];
        
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
