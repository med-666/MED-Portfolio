document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
      year: document.getElementById('year'),
      menuToggle: document.querySelector('.menu-toggle'),
      navLinks: document.querySelector('.nav-links'),
      navbar: document.getElementById('navbar'),
      sections: document.querySelectorAll('section'),
      navLinksAll: document.querySelectorAll('.nav-links a')
    };
  
    // Set current year
    elements.year.textContent = new Date().getFullYear();
  
    // Mobile menu toggle
    elements.menuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      elements.navLinks.classList.toggle('active');
      this.querySelector('i').classList.toggle('fa-times');
      this.querySelector('i').classList.toggle('fa-bars');
    });
  
    // Close mobile menu when clicking a link
    elements.navLinksAll.forEach(link => {
      link.addEventListener('click', () => {
        elements.navLinks.classList.remove('active');
        elements.menuToggle.querySelector('i').classList.remove('fa-times');
        elements.menuToggle.querySelector('i').classList.add('fa-bars');
        elements.menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  
    // Sticky navbar
    const navbarHeight = elements.navbar.offsetHeight;
    
    function handleScroll() {
      if (window.scrollY > 100) {
        elements.navbar.classList.add('scrolled');
      } else {
        elements.navbar.classList.remove('scrolled');
      }
    }
  
    window.addEventListener('scroll', debounce(handleScroll), { passive: true });
  
    // Text animation
    const text = document.querySelector(".sec-text");
    const textLoad = () => {
      setTimeout(() => text.textContent = "digital experiences", 0);
      setTimeout(() => text.textContent = "web applications", 4000);
      setTimeout(() => text.textContent = "creative solutions", 8000);
    };
    textLoad();
    setInterval(textLoad, 12000);
  
    // Initialize Swiper
    const swiper = new Swiper('.project-carousel', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 1.2,
          centeredSlides: true
        },
        992: {
          slidesPerView: 2,
          centeredSlides: false
        }
      }
    });
  
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
  
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - navbarHeight,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Form submission logic would go here
        this.reset();
      });
    }
  
    // Utility functions
    function debounce(func, wait = 100) {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }
  });