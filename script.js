(function () {
  'use strict';

  /* =========================================================
     PRODUCT CATALOG DATA
     ========================================================= */
  var PRODUCTS = [
    // Security & Surveillance
    { cat: 'security', icon: 'i-camera', tag: 'CAM-IP/AHD', name: 'IP &amp; Analog CCTV Cameras', desc: 'Dome, bullet and PTZ cameras with day/night imaging and wide dynamic range.' },
    { cat: 'security', icon: 'i-panel', tag: 'NVR / DVR', name: 'Recording Systems', desc: 'Multi-channel network and analog recorders with remote viewing and long-term storage.' },
    { cat: 'security', icon: 'i-shield', tag: 'ACS-CTRL', name: 'Access Control Systems', desc: 'Card, fingerprint and facial-recognition controllers for doors, lifts and gates.' },
    { cat: 'security', icon: 'i-gate', tag: 'GATE-SPD', name: 'Speed Gates', desc: 'Swing and sliding speed lanes for lobbies and high-traffic entrances.' },
    { cat: 'security', icon: 'i-barrier', tag: 'GATE-FLP', name: 'Flap Barriers', desc: 'Compact, lightweight flap-barrier lanes for offices, factories and transit points.' },
    { cat: 'security', icon: 'i-barrier', tag: 'GATE-BOOM', name: 'Boom Barriers', desc: 'Vehicle boom barriers for parking entries and perimeter checkpoints.' },
    { cat: 'security', icon: 'i-card', tag: 'RDR-BIO', name: 'Biometric &amp; Card Readers', desc: 'Fingerprint, RFID and hybrid readers for access and attendance.' },
    { cat: 'security', icon: 'i-speaker', tag: 'PA-SYS', name: 'Public Address Systems', desc: 'Zone-based announcement and emergency paging systems.' },

    // Networking & Data Center
    { cat: 'networking', icon: 'i-switch', tag: 'SW-24/48P', name: 'Managed Network Switches', desc: 'PoE and non-PoE switches from 8 to 48 ports for enterprise LANs.' },
    { cat: 'networking', icon: 'i-router', tag: 'RTR-GW', name: 'Routers &amp; Firewalls', desc: 'Gateway routers and UTM firewalls for secure, segmented networks.' },
    { cat: 'networking', icon: 'i-wifi', tag: 'WAP-AC', name: 'Wireless Access Points', desc: 'Indoor and outdoor APs for high-density Wi-Fi coverage.' },
    { cat: 'networking', icon: 'i-cable', tag: 'UTP-CAT6', name: 'UTP Cabling — Cat5e / Cat6 / Cat6A', desc: 'Structured copper cabling for voice, data and PoE runs.' },
    { cat: 'networking', icon: 'i-fiber', tag: 'FBR-SM/MM', name: 'Fiber Optic Cabling', desc: 'Single-mode and multi-mode fiber for backbone and long-haul links.' },
    { cat: 'networking', icon: 'i-panel', tag: 'PP-24/48', name: 'Patch Panels &amp; Patch Cords', desc: 'Rack-mount termination panels and factory-tested patch cords.' },
    { cat: 'networking', icon: 'i-rack', tag: 'RACK-42U', name: 'Server Racks &amp; Cabinets', desc: 'Open-frame and enclosed cabinets sized for server and network gear.' },
    { cat: 'networking', icon: 'i-kvm', tag: 'KVM-SW', name: 'KVM Switches', desc: 'Console switches for managing multiple servers from one keyboard and monitor.' },

    // Power Systems
    { cat: 'power', icon: 'i-ups', tag: 'UPS-ON/LINE', name: 'UPS Systems', desc: 'Online and line-interactive UPS units sized for racks and full sites.' },
    { cat: 'power', icon: 'i-pdu', tag: 'PDU-RACK', name: 'Power Distribution Units', desc: 'Rack-mount PDUs, basic and metered, for clean power distribution.' },
    { cat: 'power', icon: 'i-pdu', tag: 'STB-AVR', name: 'Voltage Stabilizers', desc: 'Automatic voltage regulators protecting sensitive equipment.' },
    { cat: 'power', icon: 'i-solar', tag: 'SLR-HYB', name: 'Solar Power Solutions', desc: 'Hybrid solar systems for backup power and reduced grid dependence.' },
    { cat: 'power', icon: 'i-gen', tag: 'GEN-STBY', name: 'Standby Generators', desc: 'Generators sized for offices and light-industrial sites.' },

    // Displays & LED
    { cat: 'displays', icon: 'i-ledwall', tag: 'LED-WALL', name: 'LED Video Walls', desc: 'Fine-pitch indoor and outdoor video walls for lobbies and event spaces.' },
    { cat: 'displays', icon: 'i-ledwall', tag: 'SMD-P2 / P10', name: 'SMD LED Screens', desc: 'SMD display panels across pitch sizes for signage, stages and stadiums.' },
    { cat: 'displays', icon: 'i-signage', tag: 'SIGN-DIG', name: 'Digital Signage Displays', desc: 'Commercial displays and media players for retail and corporate signage.' },
    { cat: 'displays', icon: 'i-bulb', tag: 'LED-LGT', name: 'LED Lighting', desc: 'Energy-efficient LED fixtures for offices, warehouses and outdoor areas.' },

    // IT & Office Equipment
    { cat: 'it-equipment', icon: 'i-laptop', tag: 'PC-LT/DT', name: 'Laptops &amp; Desktops', desc: 'Business-grade laptops and desktops sourced direct from source.' },
    { cat: 'it-equipment', icon: 'i-printer', tag: 'PRT-MFP', name: 'Printers, Scanners &amp; MFPs', desc: 'Laser and inkjet printers, scanners and multi-function devices.' },
    { cat: 'it-equipment', icon: 'i-pos', tag: 'POS-EQ', name: 'POS &amp; Office Equipment', desc: 'Point-of-sale terminals and general office equipment.' }
  ];

  var CATEGORY_LABEL = {
    security: 'Security',
    networking: 'Networking',
    power: 'Power',
    displays: 'Displays',
    'it-equipment': 'IT Equipment'
  };

  function renderCatalog(filter) {
    var grid = document.getElementById('catalogGrid');
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map(function (p) {
      var show = filter === 'all' || filter === p.cat;
      return (
        '<article class="product-card" data-cat="' + p.cat + '"' + (show ? '' : ' hidden') + '>' +
          '<div class="card-top">' +
            '<svg class="icon" width="22" height="22"><use href="#' + p.icon + '"/></svg>' +
            '<span class="product-tag">' + p.tag + '</span>' +
          '</div>' +
          '<h3>' + p.name + '</h3>' +
          '<p>' + p.desc + '</p>' +
        '</article>'
      );
    }).join('');
  }

  function initCatalogTabs() {
    var tabs = document.getElementById('catalogTabs');
    if (!tabs) return;
    renderCatalog('all');
    tabs.addEventListener('click', function (e) {
      var btn = e.target.closest('.tab-btn');
      if (!btn) return;
      tabs.querySelectorAll('.tab-btn').forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      renderCatalog(btn.getAttribute('data-filter'));
    });
  }

  /* =========================================================
     MOBILE NAV
     ========================================================= */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('mainNav');
    if (!toggle || !nav) return;

    function closeNav() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<svg class="icon" width="24" height="24"><use href="#i-menu"/></svg>';
    }
    function openNav() {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.innerHTML = '<svg class="icon" width="24" height="24"><use href="#i-close"/></svg>';
    }
    toggle.addEventListener('click', function () {
      nav.classList.contains('is-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* =========================================================
     HEADER SHADOW ON SCROLL + BACK TO TOP
     ========================================================= */
  function initScrollChrome() {
    var header = document.getElementById('siteHeader');
    var toTop = document.getElementById('toTop');
    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (header) header.classList.toggle('is-scrolled', y > 8);
      if (toTop) toTop.classList.toggle('is-visible', y > 500);
    }
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* =========================================================
     SCROLL REVEAL
     ========================================================= */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !items.length) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* =========================================================
     HERO PORT GRID — ambient "link status" animation
     ========================================================= */
  function initPortGrid() {
    var grid = document.getElementById('portGrid');
    if (!grid) return;
    var TOTAL = 32;
    var ports = [];
    for (var i = 0; i < TOTAL; i++) {
      var p = document.createElement('div');
      p.className = 'port';
      grid.appendChild(p);
      ports.push(p);
    }
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Seed a few as "live"
    [2, 5, 9, 14, 20, 27].forEach(function (i) { if (ports[i]) ports[i].classList.add('is-live'); });
    if (reduceMotion) return;
    setInterval(function () {
      var idx = Math.floor(Math.random() * TOTAL);
      ports[idx].classList.toggle('is-live');
    }, 900);
  }

  /* =========================================================
     CONTACT FORM VALIDATION
     ========================================================= */
  function initForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var success = document.getElementById('formSuccess');
    var emailButton = document.getElementById('sendEmail');
    var whatsappNumber = '923308119320';

    var rules = {
      fName: function (v) { return v.trim().length > 1 || 'Please enter your name.'; },
      fEmail: function (v) { return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v) || 'Enter a valid email address.'; },
      fPhone: function (v) { return v.replace(/[^0-9]/g, '').length >= 7 || 'Enter a valid phone number.'; },
      fMessage: function (v) { return v.trim().length > 4 || 'Please add a few details about your requirement.'; }
    };

    function validateField(input) {
      var rule = rules[input.id];
      if (!rule) return true;
      var result = rule(input.value);
      var field = input.closest('.field');
      var errorEl = form.querySelector('[data-error-for="' + input.id + '"]');
      if (result === true) {
        if (field) field.classList.remove('has-error');
        if (errorEl) errorEl.textContent = '';
        input.setAttribute('aria-invalid', 'false');
        return true;
      }
      if (field) field.classList.add('has-error');
      if (errorEl) errorEl.textContent = result;
      input.setAttribute('aria-invalid', 'true');
      return false;
    }

    function validateForm() {
      var valid = true;
      Object.keys(rules).forEach(function (id) {
        var input = document.getElementById(id);
        if (input && !validateField(input)) valid = false;
      });
      if (!valid) {
        var firstError = form.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
      }
      return valid;
    }

    function buildMessage() {
      var value = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };
      var interest = document.getElementById('fInterest');
      var interestLabel = interest && interest.selectedOptions.length
        ? interest.selectedOptions[0].textContent.trim() : 'Not specified';
      return [
        'APPOINTMENT / QUOTE REQUEST — Net Trading & Marketing',
        '',
        'Name: ' + value('fName'),
        'Company: ' + (value('fCompany') || 'Not provided'),
        'Email: ' + value('fEmail'),
        'Phone: ' + value('fPhone'),
        'Interested in: ' + interestLabel,
        'Preferred date: ' + (value('fDate') || 'Flexible'),
        'Preferred time: ' + (value('fTime') || 'Flexible'),
        '',
        'Project details:',
        value('fMessage')
      ].join('\\n');
    }

    function showSuccess(message) {
      if (!success) return;
      success.textContent = message;
      success.hidden = false;
    }

    Object.keys(rules).forEach(function (id) {
      var input = document.getElementById(id);
      if (input) {
        input.addEventListener('blur', function () { validateField(input); });
        input.addEventListener('input', function () {
          if (input.getAttribute('aria-invalid') === 'true') validateField(input);
        });
      }
    });

    // Prevent choosing an appointment date in the past.
    var dateInput = document.getElementById('fDate');
    if (dateInput) {
      var today = new Date();
      dateInput.min = today.getFullYear() + '-' +
        String(today.getMonth() + 1).padStart(2, '0') + '-' +
        String(today.getDate()).padStart(2, '0');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm()) return;
      var url = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(buildMessage());
      var opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened) window.location.href = url;
      showSuccess('Your request is ready in WhatsApp. Please press Send there to confirm your appointment or quote request.');
    });

    if (emailButton) {
      emailButton.addEventListener('click', function () {
        if (!validateForm()) return;
        var subject = 'Appointment / Quote Request — Net Trading & Marketing';
        var mailto = 'mailto:khubibabrar1@gmail.com?subject=' +
          encodeURIComponent(subject) + '&body=' + encodeURIComponent(buildMessage());
        window.location.href = mailto;
        showSuccess('Your email app should open with the request filled in. Please press Send to submit it.');
      });
    }
  }

  /* =========================================================
     INIT
     ========================================================= */
  document.addEventListener('DOMContentLoaded', function () {
    initCatalogTabs();
    initNav();
    initScrollChrome();
    initReveal();
    initPortGrid();
    initForm();
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
