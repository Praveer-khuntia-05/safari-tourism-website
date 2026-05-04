(function () {
  'use strict';

  /*  ELEMENTS */
  const header        = document.getElementById('siteHeader');
  const hamburgerBtn  = document.getElementById('hamburgerBtn');
  const menuOverlay   = document.getElementById('menuOverlay');
  const menuClose     = document.getElementById('menuClose');
  const heroPrev      = document.getElementById('heroPrev');
  const heroNext      = document.getElementById('heroNext');
  const tourPrev      = document.getElementById('tourPrev');
  const tourNext      = document.getElementById('tourNext');
  const toursTrack    = document.getElementById('toursTrack');
  const tourDots      = document.querySelectorAll('.tdot');

  /* 1. STICKY HEADER — transparent → white on scroll */
  function handleScroll() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  /*  2. HAMBURGER MENU OVERLAY */
  hamburgerBtn.addEventListener('click', () => {
    menuOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  menuClose.addEventListener('click', closeMenu);

  // Close on overlay background click (outside content)
  menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) closeMenu();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  function closeMenu() {
    menuOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /*  3. HERO SLIDER — fade transition, auto-play 5 seconds */
  const slides     = document.querySelectorAll('.slide');
  let currentSlide = 0;
  let heroTimer    = null;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoPlay() {
    heroTimer = setInterval(nextSlide, 5000);
  }

  function resetAutoPlay() {
    clearInterval(heroTimer);
    startAutoPlay();
  }

  heroNext.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
  heroPrev.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

  startAutoPlay();

  /*  4. TOUR CARDS CAROUSEL  */
  const allCards       = toursTrack.querySelectorAll('.tour-card');
  const totalCards     = allCards.length;
  let cardIndex        = 0;  
  const visibleCards   = 3;  
  const maxIndex       = totalCards - visibleCards; 

  function getCardWidth() {
    
    const container = toursTrack.parentElement; 
    const containerW = container.offsetWidth;
    const gap = 20;
    return (containerW - gap * (visibleCards - 1)) / visibleCards;
  }

  function updateTrack(animated) {
    const cardW = getCardWidth();
    const gap   = 20;
    const offset = cardIndex * (cardW + gap);

    if (animated === false) {
      toursTrack.style.transition = 'none';
    } else {
      toursTrack.style.transition = 'transform 0.45s cubic-bezier(0.77,0,0.175,1)';
    }
    toursTrack.style.transform = `translateX(-${offset}px)`;

    // Update dots
    tourDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === cardIndex);
    });
  }

  function setCardWidths() {
    const cardW = getCardWidth();
    allCards.forEach(card => {
      card.style.flex = `0 0 ${cardW}px`;
      card.style.width = `${cardW}px`;
    });
    updateTrack(false);
  }

  // Init
  setCardWidths();
  window.addEventListener('resize', () => {
    setCardWidths();
  });

  tourNext.addEventListener('click', () => {
    if (cardIndex < maxIndex) {
      cardIndex++;
    }
    updateTrack();
  });

  tourPrev.addEventListener('click', () => {
    if (cardIndex > 0) {
      cardIndex--;
    }
    updateTrack();
  });

  // Dot clicks
  tourDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      cardIndex = Math.min(i, maxIndex);
      updateTrack();
    });
  });


})();
