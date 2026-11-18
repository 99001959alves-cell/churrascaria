(function () {
  'use strict';

  var STORAGE_KEY = 'fogo_nobre_site_config_v1';

  var MENU_ITEMS = [
    {
      id: 'picanha',
      category: 'carnes',
      categoryLabel: 'Carnes nobres · Na brasa',
      name: 'Picanha',
      description: 'Corte nobre com capa de gordura dourada na brasa, sal grosso selecionado e suculência marcante a cada fatia.',
      imageKey: 'corte_picanha'
    },
    {
      id: 'costela-bovina',
      category: 'carnes',
      categoryLabel: 'Carnes nobres · Fogo lento',
      name: 'Costela bovina',
      description: 'Assada lentamente por horas na brasa até atingir maciez extrema, soltando do osso com crosta caramelizada.',
      imageKey: 'corte_costela'
    },
    {
      id: 'maminha',
      category: 'carnes',
      categoryLabel: 'Carnes nobres · Na brasa',
      name: 'Maminha',
      description: 'Corte macio e delicado, servido fatiado no ponto exato para preservar todo o sabor natural da carne.',
      imageKey: 'corte_maminha'
    },
    {
      id: 'alcatra',
      category: 'carnes',
      categoryLabel: 'Carnes nobres · Na brasa',
      name: 'Alcatra',
      description: 'Medalhões altos selados em brasa viva, combinando textura macia, fibras finas e equilíbrio perfeito.',
      imageKey: 'corte_alcatra'
    },
    {
      id: 'fraldinha',
      category: 'carnes',
      categoryLabel: 'Carnes nobres · Na brasa',
      name: 'Fraldinha',
      description: 'Preparada em fogo forte e fatiada contra as fibras, destacando marmoreio leve e sabor intenso.',
      imageKey: 'corte_fraldinha'
    },
    {
      id: 'contra-file',
      category: 'carnes',
      categoryLabel: 'Carnes nobres · Na brasa',
      name: 'Contra-filé',
      description: 'Corte tradicional com borda de gordura tostada na grelha, aroma defumado e maciez pronunciada.',
      imageKey: 'corte_contrafile'
    },
    {
      id: 'cupim',
      category: 'carnes',
      categoryLabel: 'Carnes nobres · Assado lento',
      name: 'Cupim',
      description: 'Ricamente marmorizado e assado com paciência na brasa, resultando em fatias douradas que desmancham na boca.',
      imageKey: 'corte_cupim'
    },
    {
      id: 'arroz-branco',
      category: 'acompanhamentos',
      categoryLabel: 'Acompanhamentos · Clássico',
      name: 'Arroz branco',
      description: 'Soltinho, preparado na hora com tempero suave e finalizado com cheiro-verde fresco.',
      imageKey: 'acomp_arroz_branco'
    },
    {
      id: 'farofa-especial',
      category: 'acompanhamentos',
      categoryLabel: 'Acompanhamentos · Da casa',
      name: 'Farofa especial',
      description: 'Farinha de mandioca tostada na manteiga de garrafa com bacon crocante, cebola dourada e cebolinha.',
      imageKey: 'acomp_farofa_especial'
    },
    {
      id: 'vinagrete',
      category: 'acompanhamentos',
      categoryLabel: 'Acompanhamentos · Fresco',
      name: 'Vinagrete',
      description: 'Tomates maduros, cebola branca, pimentão verde e salsinha picados à faca, regados em azeite extravirgem.',
      imageKey: 'acomp_vinagrete'
    },
    {
      id: 'mandioca-cozida',
      category: 'acompanhamentos',
      categoryLabel: 'Acompanhamentos · Tradicional',
      name: 'Mandioca cozida',
      description: 'Mandioca amarela macia servida quente com manteiga de ervas e toque de sal marinho.',
      imageKey: 'acomp_mandioca'
    },
    {
      id: 'feijao-tropeiro',
      category: 'acompanhamentos',
      categoryLabel: 'Acompanhamentos · Receita tradicional',
      name: 'Feijão tropeiro',
      description: 'Feijão selecionado com farinha tostada, linguiça artesanal, couve refogada, ovo e torresmo crocante.',
      imageKey: 'acomp_feijao_tropeiro'
    },
    {
      id: 'batata-frita',
      category: 'acompanhamentos',
      categoryLabel: 'Acompanhamentos · Crocante',
      name: 'Batata frita',
      description: 'Cortes artesanais fritos na hora até ficarem dourados e crocantes, finalizados com flor de sal e alecrim.',
      imageKey: 'acomp_batata_frita'
    },
    {
      id: 'saladas-variadas',
      category: 'acompanhamentos',
      categoryLabel: 'Acompanhamentos · Mesa de saladas',
      name: 'Saladas variadas',
      description: 'Folhas frescas selecionadas, tomates-cereja, palmito pupunha, azeitonas nobres e lascas de parmesão.',
      imageKey: 'acomp_saladas'
    },
    {
      id: 'refrigerantes',
      category: 'bebidas',
      categoryLabel: 'Bebidas · Geladas',
      name: 'Refrigerantes',
      description: 'Seleção completa de refrigerantes tradicionais e versões sem açúcar servidos com gelo e rodelas de limão.',
      imageKey: 'bebida_refrigerantes'
    },
    {
      id: 'sucos-naturais',
      category: 'bebidas',
      categoryLabel: 'Bebidas · Frutas frescas',
      name: 'Sucos naturais',
      description: 'Preparados na hora com frutas selecionadas: laranja, maracujá, abacaxi com hortelã e limão siciliano.',
      imageKey: 'bebida_sucos'
    },
    {
      id: 'agua',
      category: 'bebidas',
      categoryLabel: 'Bebidas · Mineral',
      name: 'Água',
      description: 'Água mineral natural sem gás ou com gás, servida gelada com gelo e raspas de limão opcional.',
      imageKey: 'bebida_agua'
    },
    {
      id: 'cervejas',
      category: 'bebidas',
      categoryLabel: 'Bebidas · Na temperatura ideal',
      name: 'Cervejas',
      description: 'Rótulos pilsen, puro malte e chopp cremoso tirado na temperatura ideal para harmonizar com a brasa.',
      imageKey: 'bebida_cervejas'
    }
  ];

  var CATEGORY_META = [
    { key: 'carnes', title: '01. Carnes e cortes especiais' },
    { key: 'acompanhamentos', title: '02. Acompanhamentos' },
    { key: 'bebidas', title: '03. Bebidas' }
  ];

  var GALLERY_ITEMS = [
    {
      title: 'Picanha na brasa',
      subtitle: 'Corte nobre selado sobre carvão em brasa viva',
      imageKey: 'corte_picanha'
    },
    {
      title: 'Costela assada',
      subtitle: 'Assada lentamente até desmanchar com crosta dourada',
      imageKey: 'corte_costela'
    },
    {
      title: 'Espetinhos na brasa',
      subtitle: 'Preparo artesanal com carnes selecionadas e linguiça',
      imageKey: 'gal_espetinhos'
    },
    {
      title: 'Buffet de acompanhamentos',
      subtitle: 'Saladas frescas, palmito, azeitonas e ingredientes nobres',
      imageKey: 'acomp_saladas'
    },
    {
      title: 'Ambiente da churrascaria',
      subtitle: 'Salão climatizado em madeira nobre e iluminação acolhedora',
      imageKey: 'exp_ambiente_salao'
    },
    {
      title: 'Pratos completos',
      subtitle: 'Picanha fatiada com arroz, farofa especial, vinagrete e mandioca',
      imageKey: 'gal_prato_completo'
    }
  ];

  var IMAGES = window.__SITE_IMAGES__ || {};
  var activeCategory = 'todos';
  var lightboxItems = [];
  var lightboxIndex = 0;
  var lastFocusedEl = null;
  var toastTimer = null;

  function parseEmbeddedConfig() {
    var el = document.getElementById('site-config');
    if (!el) return { contact: {}, prices: {} };
    try {
      return JSON.parse(el.textContent || '{}');
    } catch (e) {
      return { contact: {}, prices: {} };
    }
  }

  function loadConfig() {
    var base = parseEmbeddedConfig();
    var isPublished = document.documentElement.getAttribute('data-published') === 'true';
    var isAdminUrl = window.location.search.indexOf('admin=1') !== -1;

    if (isPublished && !isAdminUrl) {
      return base;
    }

    try {
      var savedRaw = window.localStorage.getItem(STORAGE_KEY);
      if (!savedRaw) return base;
      var saved = JSON.parse(savedRaw);
      return {
        contact: Object.assign({}, base.contact || {}, saved.contact || {}),
        prices: Object.assign({}, base.prices || {}, saved.prices || {})
      };
    } catch (e) {
      return base;
    }
  }

  var siteConfig = loadConfig();

  function saveConfigLocal() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(siteConfig));
    } catch (e) {
      // Ignore storage quota or private mode issues
    }
  }

  function sanitizePhoneDigits(raw) {
    var digits = String(raw || '').replace(/\D+/g, '');
    if (!digits) return '5511998423100';
    if (digits.length === 10 || digits.length === 11) {
      return '55' + digits;
    }
    return digits;
  }

  function formatIsoDateToBr(isoDate) {
    if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return isoDate;
    var parts = isoDate.split('-');
    return parts[2] + '/' + parts[1] + '/' + parts[0];
  }

  function buildWhatsAppUrl(details) {
    var contact = siteConfig.contact || {};
    var digits = sanitizePhoneDigits(contact.whatsappDigits);
    var restaurantName = contact.restaurantName || 'Fogo Nobre';
    var name = details && details.name ? String(details.name).trim() : '';
    var date = details && details.date ? formatIsoDateToBr(details.date) : '';
    var time = details && details.time ? String(details.time).trim() : '';
    var guests = details && details.guests ? String(details.guests).trim() : '';
    var notes = details && details.notes ? String(details.notes).trim() : '';

    var message = 'Olá! Gostaria de fazer uma reserva na Churrascaria ' + restaurantName + '.';
    if (name || date || time || guests) {
      var lines = ['Olá! Gostaria de solicitar uma reserva na Churrascaria ' + restaurantName + ':'];
      if (name) lines.push('• Nome: ' + name);
      if (date) lines.push('• Data: ' + date);
      if (time) lines.push('• Horário: ' + time);
      if (guests) lines.push('• Pessoas: ' + guests);
      if (notes) lines.push('• Observações: ' + notes);
      message = lines.join('\n');
    }

    return 'https://wa.me/' + digits + '?text=' + encodeURIComponent(message);
  }

  function formatPriceDisplay(raw) {
    var cleaned = String(raw || '').trim();
    return cleaned.length > 0 ? cleaned : 'Sob consulta';
  }

  function getImageSrc(key) {
    return IMAGES[key] || '';
  }

  function hydrateStaticImages() {
    var nodes = document.querySelectorAll('img[data-img-key]');
    nodes.forEach(function (img) {
      var key = img.getAttribute('data-img-key');
      var src = getImageSrc(key);
      if (src) {
        img.src = src;
      }
    });
  }

  function showToast(message) {
    var toast = document.getElementById('toast-feedback');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 3400);
  }

  function createMenuCardHtml(item) {
    var priceRaw = (siteConfig.prices && siteConfig.prices[item.id]) || '';
    var priceText = formatPriceDisplay(priceRaw);
    var priceClass = priceRaw.trim() ? 'menu-price' : 'menu-price is-muted';
    var imgSrc = getImageSrc(item.imageKey);

    return (
      '<article class="menu-card" data-item-id="' + item.id + '">' +
        '<div class="menu-card-media">' +
          '<img src="' + imgSrc + '" alt="' + escapeHtml(item.name) + ' — Churrascaria Fogo Nobre" decoding="async" referrerpolicy="no-referrer">' +
        '</div>' +
        '<div class="menu-card-body">' +
          '<div class="menu-card-meta">' + escapeHtml(item.categoryLabel) + '</div>' +
          '<h4 class="menu-card-title">' + escapeHtml(item.name) + '</h4>' +
          '<p class="menu-card-desc">' + escapeHtml(item.description) + '</p>' +
          '<div class="menu-card-footer">' +
            '<span class="' + priceClass + '" data-price-display="' + item.id + '">' + escapeHtml(priceText) + '</span>' +
            '<a class="menu-order-link" href="#reservas">Reservar mesa →</a>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderMenu() {
    var container = document.getElementById('menu-sections-container');
    if (!container) return;

    var groupsToRender =
      activeCategory === 'todos'
        ? CATEGORY_META
        : CATEGORY_META.filter(function (g) {
            return g.key === activeCategory;
          });

    var html = groupsToRender
      .map(function (group) {
        var items = MENU_ITEMS.filter(function (item) {
          return item.category === group.key;
        });
        return (
          '<div class="menu-group" data-menu-group="' + group.key + '">' +
            '<div class="menu-group-header">' +
              '<h3 class="menu-group-title">' + escapeHtml(group.title) + '</h3>' +
              '<span class="menu-group-count">' + items.length + ' opções</span>' +
            '</div>' +
            '<div class="menu-grid">' +
              items.map(createMenuCardHtml).join('') +
            '</div>' +
          '</div>'
        );
      })
      .join('');

    container.innerHTML = html;
  }

  function renderGallery() {
    var container = document.getElementById('gallery-grid');
    if (!container) return;

    container.innerHTML = GALLERY_ITEMS.map(function (item, idx) {
      var imgSrc = getImageSrc(item.imageKey);
      return (
        '<button type="button" class="gallery-item" data-gallery-index="' + idx + '" aria-label="Ampliar foto: ' + escapeHtml(item.title) + '">' +
          '<img src="' + imgSrc + '" alt="' + escapeHtml(item.title) + ' — ' + escapeHtml(item.subtitle) + '" decoding="async" referrerpolicy="no-referrer">' +
          '<span class="gallery-caption">' +
            '<span class="gallery-caption-title">' + escapeHtml(item.title) + '</span>' +
            '<span class="gallery-caption-hint">Ampliar</span>' +
          '</span>' +
        '</button>'
      );
    }).join('');
  }

  function applyContactBindings() {
    var c = siteConfig.contact || {};
    var phone = c.phoneDisplay || '(11) 3421-8890';
    var address = c.address || 'Alameda Lorena, 1480 — Jardins, São Paulo - SP';
    var hoursWeekdays = c.hoursWeekdays || 'Terça a Sexta: 11h30 às 15h30 e 18h30 às 23h';
    var hoursWeekends = c.hoursWeekends || 'Sábados, Domingos e Feriados: 11h30 às 23h';
    var instagram = c.instagramUrl || 'https://instagram.com/fogonobrechurrascaria';
    var facebook = c.facebookUrl || 'https://facebook.com/fogonobrechurrascaria';
    var mapsQuery = c.mapsQuery || address;
    var quickWhatsApp = buildWhatsAppUrl();

    document.querySelectorAll('[data-bind="phone"]').forEach(function (el) {
      el.textContent = phone;
      if (el.tagName === 'A') {
        el.setAttribute('href', 'tel:+' + sanitizePhoneDigits(phone));
      }
    });
    document.querySelectorAll('[data-bind="address"]').forEach(function (el) {
      el.textContent = address;
    });
    document.querySelectorAll('[data-bind="hours-weekdays"]').forEach(function (el) {
      el.textContent = hoursWeekdays;
    });
    document.querySelectorAll('[data-bind="hours-weekends"]').forEach(function (el) {
      el.textContent = hoursWeekends;
    });
    document.querySelectorAll('[data-bind="instagram"]').forEach(function (el) {
      el.setAttribute('href', instagram);
    });
    document.querySelectorAll('[data-bind="facebook"]').forEach(function (el) {
      el.setAttribute('href', facebook);
    });
    document.querySelectorAll('[data-bind="whatsapp-quick"]').forEach(function (el) {
      el.setAttribute('href', quickWhatsApp);
    });

    var mapIframe = document.getElementById('google-maps-iframe');
    var mapExternal = document.getElementById('google-maps-external');
    if (mapIframe) {
      var embedUrl = /^https?:\/\//i.test(mapsQuery)
        ? mapsQuery
        : 'https://maps.google.com/maps?q=' + encodeURIComponent(mapsQuery) + '&t=&z=15&ie=UTF8&iwloc=&output=embed';
      if (mapIframe.getAttribute('src') !== embedUrl) {
        mapIframe.setAttribute('src', embedUrl);
      }
    }
    if (mapExternal) {
      var openUrl = /^https?:\/\//i.test(mapsQuery)
        ? mapsQuery
        : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(mapsQuery);
      mapExternal.setAttribute('href', openUrl);
    }
  }

  /* ========================================================================
     Lightbox
     ======================================================================== */
  function openLightbox(items, startIndex) {
    lightboxItems = items;
    lightboxIndex = startIndex;
    lastFocusedEl = document.activeElement;
    updateLightboxView();

    var lb = document.getElementById('lightbox');
    if (lb) {
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      var closeBtn = document.getElementById('lightbox-close');
      if (closeBtn) closeBtn.focus();
    }
  }

  function closeLightbox() {
    var lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('is-open')) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  }

  function stepLightbox(delta) {
    if (!lightboxItems.length) return;
    lightboxIndex = ((lightboxIndex + delta) % lightboxItems.length + lightboxItems.length) % lightboxItems.length;
    updateLightboxView();
  }

  function updateLightboxView() {
    var item = lightboxItems[lightboxIndex];
    if (!item) return;
    var img = document.getElementById('lightbox-img');
    var caption = document.getElementById('lightbox-caption');
    var counter = document.getElementById('lightbox-counter');
    if (img) {
      img.src = getImageSrc(item.imageKey);
      img.alt = item.title;
    }
    if (caption) {
      caption.textContent = item.title + (item.subtitle ? ' — ' + item.subtitle : '');
    }
    if (counter) {
      counter.textContent = (lightboxIndex + 1) + ' / ' + lightboxItems.length;
    }
  }

  /* ========================================================================
     Reservation Form & WhatsApp Builder
     ======================================================================== */
  function initReservationForm() {
    var form = document.getElementById('reservation-form');
    if (!form) return;

    var dateInput = document.getElementById('res-date');
    if (dateInput && !dateInput.value) {
      var today = new Date();
      var yyyy = today.getFullYear();
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var dd = String(today.getDate()).padStart(2, '0');
      var iso = yyyy + '-' + mm + '-' + dd;
      dateInput.value = iso;
      dateInput.min = iso;
    }

    function getFormValues() {
      return {
        name: (document.getElementById('res-name').value || '').trim(),
        date: document.getElementById('res-date').value || '',
        time: document.getElementById('res-time').value || '',
        guests: document.getElementById('res-guests').value || '',
        notes: (document.getElementById('res-notes').value || '').trim()
      };
    }

    function clearErrors() {
      ['err-name', 'err-date', 'err-time', 'err-guests'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.textContent = '';
      });
    }

    function updateSubmitLinkHref() {
      var vals = getFormValues();
      var submitBtn = document.getElementById('res-submit-btn');
      if (submitBtn) {
        submitBtn.setAttribute('data-wa-url', buildWhatsAppUrl(vals));
      }
    }

    form.addEventListener('input', function () {
      clearErrors();
      updateSubmitLinkHref();
    });
    form.addEventListener('change', updateSubmitLinkHref);
    updateSubmitLinkHref();

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearErrors();
      var vals = getFormValues();
      var hasError = false;

      if (vals.name.length < 2) {
        document.getElementById('err-name').textContent = 'Informe seu nome completo para agilizar a reserva.';
        hasError = true;
      }
      if (!vals.date || !/^\d{4}-\d{2}-\d{2}$/.test(vals.date)) {
        document.getElementById('err-date').textContent = 'Selecione uma data válida.';
        hasError = true;
      }
      if (!vals.time) {
        document.getElementById('err-time').textContent = 'Selecione um horário.';
        hasError = true;
      }
      var guestsNum = Number(vals.guests);
      if (!guestsNum || guestsNum < 1 || guestsNum > 40) {
        document.getElementById('err-guests').textContent = 'Informe entre 1 e 40 pessoas.';
        hasError = true;
      }

      var statusEl = document.getElementById('res-status');
      if (hasError) {
        if (statusEl) statusEl.textContent = 'Revise os campos destacados acima antes de continuar.';
        return;
      }

      var waUrl = buildWhatsAppUrl(vals);
      if (statusEl) {
        statusEl.textContent = 'Mensagem de reserva preparada para ' + vals.name + '. Redirecionando para o WhatsApp...';
      }

      var anchor = document.createElement('a');
      anchor.href = waUrl;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    });
  }

  /* ========================================================================
     Navigation, Scroll Effects & Event Wiring
     ======================================================================== */
  function initNavigation() {
    var header = document.getElementById('site-header');
    var mobileBtn = document.getElementById('mobile-menu-btn');
    var mobileDrawer = document.getElementById('mobile-drawer');

    function setMobileOpen(open) {
      if (!mobileBtn || !mobileDrawer) return;
      mobileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileDrawer.classList.toggle('is-open', open);
    }

    if (mobileBtn) {
      mobileBtn.addEventListener('click', function () {
        var isOpen = mobileDrawer && mobileDrawer.classList.contains('is-open');
        setMobileOpen(!isOpen);
      });
    }

    document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn').forEach(function (link) {
      link.addEventListener('click', function () {
        setMobileOpen(false);
      });
    });

    function onScroll() {
      if (header) {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Subtle scroll-reveal via IntersectionObserver
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var sections = document.querySelectorAll('.reveal');
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.remove('is-hidden');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -40px 0px', threshold: 0.06 }
      );
      sections.forEach(function (sec) {
        if (sec.getBoundingClientRect().top > window.innerHeight * 0.95) {
          sec.classList.add('is-hidden');
          observer.observe(sec);
        }
      });
    }
  }

  function initInteractions() {
    // Menu tabs
    var tabs = document.querySelectorAll('.menu-tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activeCategory = tab.getAttribute('data-category') || 'todos';
        tabs.forEach(function (t) {
          t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        });
        renderMenu();
      });
    });

    // Gallery clicks
    var galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
      galleryGrid.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-gallery-index]');
        if (!btn) return;
        var idx = Number(btn.getAttribute('data-gallery-index')) || 0;
        openLightbox(GALLERY_ITEMS, idx);
      });
    }

    // Experience cards lightbox
    var expGrid = document.getElementById('experience-grid');
    if (expGrid) {
      var expCards = Array.prototype.slice.call(expGrid.querySelectorAll('[data-exp-index]'));
      var expItems = expCards.map(function (card) {
        return {
          title: card.getAttribute('data-exp-title') || '',
          subtitle: card.getAttribute('data-exp-subtitle') || '',
          imageKey: card.getAttribute('data-exp-key') || ''
        };
      });
      expGrid.addEventListener('click', function (e) {
        var card = e.target.closest('[data-exp-index]');
        if (!card) return;
        var idx = Number(card.getAttribute('data-exp-index')) || 0;
        openLightbox(expItems, idx);
      });
    }

    // Lightbox controls
    var lb = document.getElementById('lightbox');
    if (lb) {
      lb.addEventListener('click', function (e) {
        if (e.target === lb) closeLightbox();
      });
    }
    var lbClose = document.getElementById('lightbox-close');
    var lbPrev = document.getElementById('lightbox-prev');
    var lbNext = document.getElementById('lightbox-next');
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', function () { stepLightbox(-1); });
    if (lbNext) lbNext.addEventListener('click', function () { stepLightbox(1); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (lb && lb.classList.contains('is-open')) {
        if (e.key === 'ArrowLeft') stepLightbox(-1);
        if (e.key === 'ArrowRight') stepLightbox(1);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    hydrateStaticImages();
    renderMenu();
    renderGallery();
    applyContactBindings();
    initReservationForm();
    initNavigation();
    initInteractions();
  });
})();
