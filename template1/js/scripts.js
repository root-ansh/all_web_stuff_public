$(window).on("load", function () {
  /**
   *-------------------------- MENU -------------------------
   */
  $(".nav-btn").on("click", function () {
    $(".nav").toggleClass("active");
    $(this).toggleClass("active");
    $("body").toggleClass("no-scroll");

    return false;
  });

  $(".nav").on("click", ".dropdown>a, .dropdown2>a", function () {
    if (!$("body.mobileActive")[0]) return;
    var menuItem = $(this);

    menuItem.parents("li").toggleClass("dropdown-active");
    menuItem.parents("li").children("ul").toggle("slow");

    return false;
  });

  $(".nav")
    .on("mouseenter", ".dropdown", function (e) {
      if ($("body.mobileActive")[0]) return;
      var menuItem = $(this);

      if (menuItem[0].timeOutMenu) {
        clearTimeout(menuItem[0].timeOutMenu);
      }

      menuItem.addClass("active");
    })
    .on("mouseleave", ".dropdown", function (e) {
      if ($("body.mobileActive")[0]) return;

      var menuItem = $(this);

      menuItem[0].timeOutMenu = setTimeout(function () {
        menuItem.removeClass("active");
      }, 500);
    });

  $(document).on("mouseup", function (e) {
    var divSearch = $(".search");
    if (!divSearch.is(e.target) && divSearch.has(e.target).length === 0) {
      divSearch.removeClass("active");
    }
  });

  if ($(".main-slider-for")[0]) {
    $(".main-slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      fade: true,
      speed: 900,
      infinite: true,
      lazyLoad: "progressive",
      cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
      touchThreshold: 100,
      asNavFor: ".main-slider-nav",
    });
  }

  if ($(".main-slider-nav")[0]) {
    $(".main-slider-nav").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      asNavFor: ".main-slider-for",
      cssEase: "ease-out",
      focusOnSelect: true,
      infinite: true,
      speed: 900,
      nextArrow:
        '<span class="slick-arrow-next"><i class="fa fa-angle-right" aria-hidden="true"></i></span>',
      prevArrow:
        '<span class="slick-arrow-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></span>',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            arrows: false,
          },
        },
      ],
    });
  }
});
