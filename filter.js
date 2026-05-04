(function () {
  'use strict';

  /* ── Raw tour data ── */
  const TOURS = [
    { id: 1,  title: 'Coast to Delta: Cape Town, Kruger, Vic Falls & Botswana Safari', location: 'Cape Town, Sabi Sand Game Reserve, Victoria Falls, Moremi and Okavango Region', nights: 12, price: 12343, dest: ['cape-town','kruger','moremi','okavango','victoria-falls'], img: 'img/filter-1.avif' },
    { id: 2,  title: 'Adventurous Cape Town and Kruger Park Tour', location: 'Cape Town, Kapama Game Reserve', nights: 6, price: 7963, dest: ['cape-town','kruger'], img: 'img/filter-2.avif' },
    { id: 3,  title: 'Luxurious Safari and Beach Honeymoon Tour', location: 'Cape Town, Sabi Sand Game Reserve, Johannesburg, Mauritius', nights: 13, price: 7951, dest: ['cape-town','kruger'], img: 'img/filter-3.avif' },
    { id: 4,  title: '3 Day Kruger Park Safari', location: 'Sabi Sand Game Reserve', nights: 2, price: 1980, dest: ['kruger'], img: 'img/filter-4.avif' },
    { id: 5,  title: 'African Legacy, Community and Wildlife Tour', location: 'Cape Town, KwaZulu-Natal, Kruger National Park', nights: 9, price: 9541, dest: ['cape-town','kruger'], img: 'img/filter-5.avif' },
    { id: 6,  title: 'Tanzania Revealed: Sun, Savannah and Spice', location: 'Arusha, Ngorongoro Crater, Serengeti, Zanzibar Archipelago', nights: 10, price: 7663, dest: ['ngorongoro','serengeti','zanzibar'], img: 'img/filter-6.avif' },
    { id: 7,  title: 'Cape, Kruger and Mozambique Tour', location: 'Franschhoek, Cape Town, Kruger National Park, Johannesburg', nights: 15, price: 14107, dest: ['cape-town','cape-winelands','kruger'], img: 'img/filter-7.avif' },
    { id: 8,  title: 'Cape Town to Eastern Cape Safari Tour', location: 'Cape Town, The Eastern Cape', nights: 6, price: 3852, dest: ['cape-town'], img: 'img/filter-1.avif' },
    { id: 9,  title: 'Namibia Unlocked: Self-Drive Safari Adventure', location: 'Windhoek, Namib-Naukluft National Park, Swakopmund, Damaraland', nights: 11, price: 8281, dest: [], img: 'img/filter-2.avif' },
    { id: 10, title: 'A Luxury Southern Africa Honeymoon Tour', location: 'Kruger National Park, Victoria Falls, Cape Town, Whale Route', nights: 15, price: 12811, dest: ['cape-town','kruger','victoria-falls'], img: 'img/filter-3.avif' },
    { id: 11, title: 'Rwanda in Motion: Game Drives & Gorillas', location: 'Kigali, Akagera National Park, Volcanoes National Park', nights: 9, price: 14203, dest: [], img: 'img/filter-4.avif' },
    { id: 12, title: 'Iconic Southern Africa Safari Tour', location: 'Cape Town, Kruger National Park, Victoria Falls, Chobe', nights: 12, price: 25682, dest: ['cape-town','kruger','chobe','victoria-falls'], img: 'img/filter-5.avif' },
    { id: 13, title: 'Honeymooner\'s Heavenly Fly-In Safari Package', location: 'Cape Town, Victoria Falls, Chobe Region', nights: 9, price: 5934, dest: ['cape-town','chobe','victoria-falls'], img: 'img/filter-6.avif' },
    { id: 14, title: 'Romantic Beach and Safari Honeymoon Tour', location: 'Cape Town, Kruger, Mauritius', nights: 9, price: 13135, dest: ['cape-town','kruger'], img: 'img/filter-7.avif' },
    { id: 15, title: 'Namibia Fly-In Safari: Kunene, Damaraland & Etosha', location: 'Kunene River, Damaraland, Etosha National Park', nights: 7, price: 9991, dest: [], img: 'img/filter-1.avif' },
    { id: 16, title: 'Adventurous Safari in Moremi and Okavango', location: 'Chobe Region, Savuti Marsh, Moremi and Okavango Region', nights: 7, price: 6900, dest: ['chobe','moremi','okavango'], img: 'img/filter-2.avif' },
    { id: 17, title: 'Luxury Endangered Species Tour', location: 'Cape Town, Antarctica', nights: 5, price: 23060, dest: ['cape-town'], img: 'img/filter-3.avif' },
    { id: 18, title: 'Best of Zambian Adventure Tour', location: 'Lower Zambezi National Park, South Luangwa National Park', nights: 10, price: 19309, dest: [], img: 'img/filter-4.avif' },
    { id: 19, title: 'Cape Town, Winelands & Kruger Tour', location: 'Cape Town, Stellenbosch Wine Route, Sabi Sand Game Reserve', nights: 8, price: 6312, dest: ['cape-town','cape-winelands','kruger'], img: 'img/filter-5.avif' },
    { id: 20, title: 'Botswana\'s Best of Safari Adventure Tour', location: 'The Kalahari Desert, Moremi and Okavango Region, Chobe Region', nights: 7, price: 10513, dest: ['chobe','moremi','okavango'], img: 'img/filter-6.avif' },
    { id: 21, title: 'Cape Town to Kruger National Park Tour', location: 'Cape Town, Kruger National Park', nights: 7, price: 4200, dest: ['cape-town','kruger'], img: 'img/filter-7.avif' },
    { id: 22, title: 'Classic Southern African Safari Tour', location: 'Nata, Savi Sand Game Reserve, Moremi, Chobe', nights: 9, price: 7800, dest: ['chobe','moremi'], img: 'img/filter-3.avif' },
    { id: 23, title: 'Garden Route Self-Drive Tour', location: 'Cape Town, Whale Route, Knysna, Sunshine Coast', nights: 11, price: 3500, dest: ['cape-town'], img: 'img/filter-5.avif' },
    { id: 24, title: 'Adventurous Highlights of Southern Africa Tour', location: 'Cape Town, Sabi Sand Game Reserve, Victoria Falls, Chobe', nights: 14, price: 9200, dest: ['cape-town','kruger','victoria-falls','chobe'], img: 'img/filter-7.avif' },
  ];

  /* ── State ── */
  let state = {
    selectedDests: [],  // array of dest keys
    duration:      'all',
    priceMin:      666,
    priceMax:      35397,
    sort:          'popular',
    page:          1,
    perPage:       8,
  };

  /* ── Derived filtered/sorted list ── */
  function getFiltered() {
    return TOURS.filter(t => {
      // destination filter
      if (state.selectedDests.length > 0) {
        const match = state.selectedDests.some(d => t.dest.includes(d));
        if (!match) return false;
      }
      // duration filter
      if (state.duration !== 'all') {
        const [lo, hi] = state.duration === '15+'
          ? [15, Infinity]
          : state.duration.split('-').map(Number);
        if (t.nights < lo || t.nights > hi) return false;
      }
      // price filter
      if (t.price < state.priceMin || t.price > state.priceMax) return false;
      return true;
    });
  }

  function getSorted(list) {
    const copy = [...list];
    if (state.sort === 'price-asc') copy.sort((a, b) => a.price - b.price);
    if (state.sort === 'price-desc') copy.sort((a, b) => b.price - a.price);
    return copy;
  }

  /* ── DOM refs ── */
  const cardsGrid      = document.getElementById('cardsGrid');
  const tourCount      = document.getElementById('tourCount');
  const emptyState     = document.getElementById('emptyState');
  const spinnerWrap    = document.getElementById('spinnerWrap');
  const paginationWrap = document.getElementById('paginationWrap');
  const pgPrev         = document.getElementById('pgPrev');
  const pgNext         = document.getElementById('pgNext');
  const pgNumbers      = document.getElementById('pgNumbers');
  const activeFiltersRow = document.getElementById('activeFiltersRow');
  const clearBtn       = document.getElementById('clearBtn');
  const emptyReset     = document.getElementById('emptyReset');

  /* ─ Destination panel ─ */
  const btnDestinations = document.getElementById('btnDestinations');
  const panelDest       = document.getElementById('panelDestinations');
  const destLabel       = document.getElementById('destLabel');
  const destSearch      = document.getElementById('destSearch');
  const destList        = document.getElementById('destList');

  /* ─ Duration panel ─ */
  const btnDuration     = document.getElementById('btnDuration');
  const panelDur        = document.getElementById('panelDuration');
  const durLabel        = document.getElementById('durLabel');

  /* ─ Price panel ─ */
  const btnPrice        = document.getElementById('btnPrice');
  const panelPrice      = document.getElementById('panelPrice');
  const priceLabel      = document.getElementById('priceLabel');
  const rangeMin        = document.getElementById('rangeMin');
  const rangeMax        = document.getElementById('rangeMax');
  const rangeFill       = document.getElementById('rangeFill');
  const rangeTrack      = document.getElementById('rangeTrack');
  const priceMinBadge   = document.getElementById('priceMinBadge');
  const priceMaxBadge   = document.getElementById('priceMaxBadge');
  const priceApply      = document.getElementById('priceApply');

  /* ─ Sort panel ─ */
  const btnSort         = document.getElementById('btnSort');
  const panelSort       = document.getElementById('panelSort');
  const sortLabel       = document.getElementById('sortLabel');

  /* DROPDOWN OPEN/CLOSE SYSTEM */
  const DROPDOWNS = [
    { btn: btnDestinations, panel: panelDest },
    { btn: btnDuration,     panel: panelDur  },
    { btn: btnPrice,        panel: panelPrice },
    { btn: btnSort,         panel: panelSort },
  ];

  function closeAllPanels(except) {
    DROPDOWNS.forEach(({ btn, panel }) => {
      if (panel === except) return;
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  function togglePanel(btn, panel) {
    const isOpen = panel.classList.contains('open');
    closeAllPanels(null);
    if (!isOpen) {
      panel.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  }

  btnDestinations.addEventListener('click', (e) => { e.stopPropagation(); togglePanel(btnDestinations, panelDest); });
  btnDuration.addEventListener('click', (e) => { e.stopPropagation(); togglePanel(btnDuration, panelDur); });
  btnPrice.addEventListener('click', (e) => { e.stopPropagation(); togglePanel(btnPrice, panelPrice); });
  btnSort.addEventListener('click', (e) => { e.stopPropagation(); togglePanel(btnSort, panelSort); });

  // Close on outside click
  document.addEventListener('click', () => closeAllPanels(null));
  document.querySelectorAll('.flt-panel').forEach(p => p.addEventListener('click', e => e.stopPropagation()));

  /*  DESTINATIONS FILTER */
  // Search filtering
  destSearch.addEventListener('input', () => {
    const q = destSearch.value.toLowerCase();
    destList.querySelectorAll('.dest-item').forEach(li => {
      li.style.display = li.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });

  destList.addEventListener('click', e => {
    const item = e.target.closest('.dest-item');
    if (!item) return;
    const key = item.dataset.dest;
    const idx = state.selectedDests.indexOf(key);
    if (idx === -1) {
      state.selectedDests.push(key);
      item.classList.add('selected');
    } else {
      state.selectedDests.splice(idx, 1);
      item.classList.remove('selected');
    }
    updateDestLabel();
    triggerFilter();
  });

  function updateDestLabel() {
    const n = state.selectedDests.length;
    if (n === 0) {
      destLabel.textContent = 'Destinations';
      btnDestinations.classList.remove('active');
    } else if (n === 1) {
      // find the text
      const el = destList.querySelector(`[data-dest="${state.selectedDests[0]}"]`);
      destLabel.textContent = el ? el.textContent : 'Destinations';
      btnDestinations.classList.add('active');
    } else {
      destLabel.textContent = `Multiple (${n})`;
      btnDestinations.classList.add('active');
    }
  }

  /*  DURATION FILTER */
  panelDur.addEventListener('click', e => {
    const item = e.target.closest('.dur-item');
    if (!item) return;
    panelDur.querySelectorAll('.dur-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    state.duration = item.dataset.dur;
    const label = item.dataset.label;
    durLabel.textContent = label;
    btnDuration.classList.toggle('active', state.duration !== 'all');
    closeAllPanels(null);
    triggerFilter();
  });

  /*  PRICE RANGE FILTER */
  const PRICE_MIN_ABS = 666;
  const PRICE_MAX_ABS = 35397;

  function updateRangeFill() {
    const lo = parseInt(rangeMin.value);
    const hi = parseInt(rangeMax.value);
    const range = PRICE_MAX_ABS - PRICE_MIN_ABS;
    const left  = ((lo - PRICE_MIN_ABS) / range) * 100;
    const right = ((PRICE_MAX_ABS - hi) / range) * 100;
    rangeFill.style.left  = left  + '%';
    rangeFill.style.right = right + '%';
    priceMinBadge.textContent = '$' + lo.toLocaleString();
    priceMaxBadge.textContent = '$' + hi.toLocaleString();
  }

  rangeMin.addEventListener('input', () => {
    if (parseInt(rangeMin.value) > parseInt(rangeMax.value) - 500) {
      rangeMin.value = parseInt(rangeMax.value) - 500;
    }
    updateRangeFill();
  });

  rangeMax.addEventListener('input', () => {
    if (parseInt(rangeMax.value) < parseInt(rangeMin.value) + 500) {
      rangeMax.value = parseInt(rangeMin.value) + 500;
    }
    updateRangeFill();
  });

  priceApply.addEventListener('click', () => {
    state.priceMin = parseInt(rangeMin.value);
    state.priceMax = parseInt(rangeMax.value);
    const lo = state.priceMin;
    const hi = state.priceMax;
    const isPristine = lo === PRICE_MIN_ABS && hi === PRICE_MAX_ABS;
    priceLabel.textContent = isPristine ? 'Price' : `$${lo.toLocaleString()} – $${hi.toLocaleString()}`;
    btnPrice.classList.toggle('active', !isPristine);
    closeAllPanels(null);
    triggerFilter();
  });

  updateRangeFill();

  /*  SORT */
  panelSort.addEventListener('click', e => {
    const item = e.target.closest('.sort-item');
    if (!item) return;
    panelSort.querySelectorAll('.sort-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    state.sort = item.dataset.sort;
    sortLabel.textContent = item.textContent.trim();
    closeAllPanels(null);
    triggerFilter();
  });

  /*  CLEAR ALL */
  function clearAll() {
    state.selectedDests = [];
    state.duration      = 'all';
    state.priceMin      = PRICE_MIN_ABS;
    state.priceMax      = PRICE_MAX_ABS;
    state.sort          = 'popular';
    state.page          = 1;

    // Reset UI
    destList.querySelectorAll('.dest-item').forEach(i => i.classList.remove('selected'));
    destLabel.textContent = 'Destinations';
    btnDestinations.classList.remove('active');

    panelDur.querySelectorAll('.dur-item').forEach(i => i.classList.remove('active'));
    panelDur.querySelector('[data-dur="all"]').classList.add('active');
    durLabel.textContent = 'Trip duration';
    btnDuration.classList.remove('active');

    rangeMin.value = PRICE_MIN_ABS;
    rangeMax.value = PRICE_MAX_ABS;
    updateRangeFill();
    priceLabel.textContent = 'Price';
    btnPrice.classList.remove('active');

    panelSort.querySelectorAll('.sort-item').forEach(i => i.classList.remove('active'));
    panelSort.querySelector('[data-sort="popular"]').classList.add('active');
    sortLabel.textContent = 'Most popular';

    destSearch.value = '';
    destList.querySelectorAll('.dest-item').forEach(i => i.style.display = '');

    triggerFilter();
  }

  clearBtn.addEventListener('click', clearAll);
  if (emptyReset) emptyReset.addEventListener('click', clearAll);

  /*  ACTIVE FILTER TAGS */
  function buildActiveTags() {
    activeFiltersRow.innerHTML = '';

    // Destinations
    state.selectedDests.forEach(d => {
      const el = destList.querySelector(`[data-dest="${d}"]`);
      const name = el ? el.textContent : d;
      addTag(name, () => {
        const idx = state.selectedDests.indexOf(d);
        if (idx > -1) state.selectedDests.splice(idx, 1);
        if (el) el.classList.remove('selected');
        updateDestLabel();
        triggerFilter();
      });
    });

    // Duration
    if (state.duration !== 'all') {
      const el = panelDur.querySelector(`[data-dur="${state.duration}"]`);
      const name = el ? el.dataset.label : state.duration;
      addTag(name, () => {
        state.duration = 'all';
        panelDur.querySelectorAll('.dur-item').forEach(i => i.classList.remove('active'));
        panelDur.querySelector('[data-dur="all"]').classList.add('active');
        durLabel.textContent = 'Trip duration';
        btnDuration.classList.remove('active');
        triggerFilter();
      });
    }

    // Price
    if (state.priceMin !== PRICE_MIN_ABS || state.priceMax !== PRICE_MAX_ABS) {
      const name = `$${state.priceMin.toLocaleString()} – $${state.priceMax.toLocaleString()}`;
      addTag(name, () => {
        state.priceMin = PRICE_MIN_ABS;
        state.priceMax = PRICE_MAX_ABS;
        rangeMin.value = PRICE_MIN_ABS;
        rangeMax.value = PRICE_MAX_ABS;
        updateRangeFill();
        priceLabel.textContent = 'Price';
        btnPrice.classList.remove('active');
        triggerFilter();
      });
    }
  }

  function addTag(text, onRemove) {
    const tag = document.createElement('span');
    tag.className = 'active-tag';
    tag.innerHTML = `${text}<button class="tag-remove" title="Remove">✕</button>`;
    tag.querySelector('.tag-remove').addEventListener('click', (e) => {
      e.stopPropagation();
      onRemove();
    });
    activeFiltersRow.appendChild(tag);
  }

  /* CARD RENDERING */
  function renderCards(list) {
    const start = (state.page - 1) * state.perPage;
    const page  = list.slice(start, start + state.perPage);

    cardsGrid.innerHTML = '';

    if (list.length === 0) {
      emptyState.style.display = 'block';
      paginationWrap.style.display = 'none';
    } else {
      emptyState.style.display = 'none';
      paginationWrap.style.display = 'flex';
    }

    page.forEach((tour, idx) => {
      const card = document.createElement('div');
      card.className = 'tour-card';
      card.style.animationDelay = (idx * 0.05) + 's';
      card.innerHTML = `
        <div class="card-bg" style="background-image:url('${tour.img}')"></div>
        <div class="card-body">
          <div class="card-top">
            <h3 class="card-title">${tour.title}</h3>
            <p class="card-location">${tour.location}</p>
            <p class="card-nights">${tour.nights} Nights</p>
          </div>
          <div class="card-bottom">
            <button class="explore-btn">EXPLORE</button>
            <div class="card-price">
              <span class="price-from">Starting from</span>
              <span class="price-amount">$${tour.price.toLocaleString()}</span>
            </div>
          </div>
        </div>`;
      cardsGrid.appendChild(card);
    });

    tourCount.textContent = `${list.length} Tour Idea${list.length !== 1 ? 's' : ''}`;
    renderPagination(list.length);
    buildActiveTags();
  }

  /*  PAGINATION */
  function renderPagination(total) {
    const totalPages = Math.ceil(total / state.perPage);
    pgNumbers.innerHTML = '';

    pgPrev.disabled = state.page <= 1;
    pgNext.disabled = state.page >= totalPages;

    if (totalPages <= 1) {
      paginationWrap.style.visibility = 'hidden';
      return;
    }
    paginationWrap.style.visibility = 'visible';

    // Build page numbers with ellipsis
    const pages = getPageRange(state.page, totalPages);
    pages.forEach(p => {
      if (p === '…') {
        const el = document.createElement('span');
        el.className = 'pg-ellipsis';
        el.textContent = '…';
        pgNumbers.appendChild(el);
      } else {
        const btn = document.createElement('button');
        btn.className = 'pg-num' + (p === state.page ? ' active' : '');
        btn.textContent = p;
        btn.addEventListener('click', () => {
          state.page = p;
          triggerFilter(false); 
          window.scrollTo({ top: document.getElementById('filterBarWrap').offsetTop - 20, behavior: 'smooth' });
        });
        pgNumbers.appendChild(btn);
      }
    });
  }

  function getPageRange(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages = [];
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, '…', total);
    } else if (current >= total - 3) {
      pages.push(1, '…', total - 4, total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, '…', current - 1, current, current + 1, '…', total);
    }
    return pages;
  }

  pgPrev.addEventListener('click', () => {
    if (state.page > 1) { state.page--; triggerFilter(false); window.scrollTo({ top: document.getElementById('filterBarWrap').offsetTop - 20, behavior: 'smooth' }); }
  });
  pgNext.addEventListener('click', () => {
    const total = Math.ceil(getFiltered().length / state.perPage);
    if (state.page < total) { state.page++; triggerFilter(false); window.scrollTo({ top: document.getElementById('filterBarWrap').offsetTop - 20, behavior: 'smooth' }); }
  });

  /*  TRIGGER FILTER with loading simulation */
  let filterTimer = null;

  function triggerFilter(showSpinner = true) {
    state.page = 1; 

    if (!showSpinner) {
      const filtered = getSorted(getFiltered());
      renderCards(filtered);
      return;
    }

    // Show spinner overlay briefly
    spinnerWrap.classList.add('active');

    clearTimeout(filterTimer);
    filterTimer = setTimeout(() => {
      spinnerWrap.classList.remove('active');
      const filtered = getSorted(getFiltered());
      renderCards(filtered);
    }, 380);
  }

  
  triggerFilter(false);

})();
