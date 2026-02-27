$(function () {
  /* ============================================
     PRELOADER
     ============================================ */
  function hidePreloader() {
    $('#preloader').addClass('hide');
    setTimeout(function () { $('#preloader').hide(); }, 700);
  }
  $(window).on('load', hidePreloader);
  // Fallback: force-hide after 1.5s if images are slow
  setTimeout(function () {
    if ($('#preloader').is(':visible')) { hidePreloader(); }
  }, 1500);

  /* ============================================
     NAVBAR — SCROLL HIDE/SHOW + BACKGROUND
     ============================================ */
  var lastScroll = 0;
  var $header = $('#main-header');

  $(window).on('scroll', function () {
    var current = $(this).scrollTop();

    // Add/remove scrolled class
    if (current > 80) {
      $header.addClass('nav-scrolled');
    } else {
      $header.removeClass('nav-scrolled nav-hidden');
      lastScroll = current;
      return;
    }

    // Hide on scroll down, show on scroll up
    if (current > lastScroll && current > 200) {
      $header.addClass('nav-hidden');
    } else {
      $header.removeClass('nav-hidden');
    }
    lastScroll = current;
  });

  /* ============================================
     ACTIVE NAV LINK
     ============================================ */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  $('#main-nav a').each(function () {
    var href = $(this).attr('href');
    if (href === path || (path === '' && href === 'index.html')) {
      $(this).addClass('active');
    }
  });

  /* ============================================
     MOBILE HAMBURGER MENU
     ============================================ */
  $('#hamburger').on('click', function () {
    $(this).toggleClass('open');
    $('#main-nav').toggleClass('open');
  });

  // Close menu when link is clicked
  $('#main-nav a').on('click', function () {
    $('#hamburger').removeClass('open');
    $('#main-nav').removeClass('open');
  });

  // Close menu on outside click
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#main-header').length) {
      $('#hamburger').removeClass('open');
      $('#main-nav').removeClass('open');
    }
  });

  /* ============================================
     SMOOTH SCROLL (anchor links)
     ============================================ */
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 600);
    }
  });

  /* ============================================
     SCROLL ANIMATIONS (Intersection Observer)
     ============================================ */
  var animObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        $(entry.target).addClass('visible');
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $('.animate-on-scroll').each(function () {
    animObserver.observe(this);
  });

  /* ============================================
     COUNTER ANIMATION
     ============================================ */
  var countersDone = false;

  function animateCounters() {
    if (countersDone) return;
    countersDone = true;
    $('[data-count]').each(function () {
      var $el = $(this);
      var target = parseInt($el.data('count'), 10);
      var suffix = $el.data('suffix') || '';
      var duration = 2000;
      var start = 0;
      var stepTime = Math.max(Math.floor(duration / target), 20);
      var step = Math.ceil(target / (duration / stepTime));
      var timer = setInterval(function () {
        start = Math.min(start + step, target);
        $el.text(start + suffix);
        if (start >= target) clearInterval(timer);
      }, stepTime);
    });
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      animateCounters();
    }
  }, { threshold: 0.3 });

  var $statsSection = $('.stats-bar, .staff-stats-section, .infra-stats').first();
  if ($statsSection.length) {
    counterObserver.observe($statsSection[0]);
  }

  /* ============================================
     JQUERY ACCORDION (academics page)
     ============================================ */
  $('.accordion-header').on('click', function () {
    var $this = $(this);
    var $body = $this.next('.accordion-body');
    var $allHeaders = $('.accordion-header');
    var $allBodies = $('.accordion-body');

    if ($this.hasClass('active')) {
      $this.removeClass('active');
      $body.slideUp(300);
    } else {
      $allHeaders.removeClass('active');
      $allBodies.slideUp(300);
      $this.addClass('active');
      $body.slideDown(300);
    }
  });

  /* ============================================
     GALLERY FILTER (gallery page)
     ============================================ */
  $('.filter-btn').on('click', function () {
    var filter = $(this).data('filter');
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    var $items = $('.gallery-grid .gallery-item');
    $items.each(function () {
      var $item = $(this);
      if (filter === 'all' || $item.data('category') === filter) {
        $item.removeClass('hidden').addClass('visible');
        $item.css({ display: '', opacity: 0, transform: 'translateY(20px)' });
        setTimeout(function () {
          $item.css({ opacity: 1, transform: 'translateY(0)' });
        }, 50);
      } else {
        $item.addClass('hidden').css({ display: 'none', opacity: 0 });
      }
    });
  });

  /* ============================================
     CUSTOM LIGHTBOX
     ============================================ */
  var lightboxImages = [];
  var currentIndex = 0;

  function buildLightboxArray() {
    lightboxImages = [];
    $('.gallery-item[data-src]').each(function () {
      lightboxImages.push({
        src: $(this).data('src'),
        alt: $(this).find('img').attr('alt') || ''
      });
    });
  }

  function openLightbox(index) {
    if (lightboxImages.length === 0) buildLightboxArray();
    currentIndex = index;
    var img = lightboxImages[currentIndex];
    $('#lightbox-img').attr({ src: img.src, alt: img.alt });
    $('#lightbox-caption').text(img.alt);
    $('#lightbox').addClass('open');
    $('body').css('overflow', 'hidden');
  }

  function closeLightbox() {
    $('#lightbox').removeClass('open');
    $('body').css('overflow', '');
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % lightboxImages.length;
    openLightbox(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
    openLightbox(currentIndex);
  }

  $(document).on('click', '.gallery-item[data-src]', function () {
    buildLightboxArray();
    var src = $(this).data('src');
    var idx = lightboxImages.findIndex(function (img) { return img.src === src; });
    openLightbox(idx >= 0 ? idx : 0);
  });

  $('#lightbox-close').on('click', closeLightbox);
  $('#lightbox-next').on('click', nextImage);
  $('#lightbox-prev').on('click', prevImage);

  $('#lightbox').on('click', function (e) {
    if ($(e.target).is('#lightbox')) closeLightbox();
  });

  $(document).on('keydown', function (e) {
    if (!$('#lightbox').hasClass('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  /* ============================================
     BACK TO TOP
     ============================================ */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 300) {
      $('#back-to-top').addClass('visible');
    } else {
      $('#back-to-top').removeClass('visible');
    }
  });

  $('#back-to-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  /* ============================================
     COPY ACCOUNT NUMBER (support page)
     ============================================ */
  $('#copy-account-btn').on('click', function () {
    var accountNo = '4929002100001280';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(accountNo).then(function () {
        showCopyFeedback();
      });
    } else {
      // Fallback
      var $temp = $('<input>');
      $('body').append($temp);
      $temp.val(accountNo).select();
      document.execCommand('copy');
      $temp.remove();
      showCopyFeedback();
    }
  });

  function showCopyFeedback() {
    var $btn = $('#copy-account-btn');
    var original = $btn.html();
    $btn.html('<i class="fas fa-check"></i> Copied!');
    setTimeout(function () { $btn.html(original); }, 2000);
  }

  /* ============================================
     LAZY LOAD GALLERY IMAGES
     ============================================ */
  var lazyObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var $img = $(entry.target);
        var src = $img.data('src');
        if (src) {
          $img.attr('src', src).removeAttr('data-src');
        }
        lazyObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '100px' });

  $('img[data-src]').each(function () {
    lazyObserver.observe(this);
  });
});
