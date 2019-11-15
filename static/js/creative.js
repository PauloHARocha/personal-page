(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 56)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Scroll reveal calls
  window.sr = ScrollReveal();

  sr.reveal('.sr-icon-1', {
    delay: 150,
    scale: 0
  });
  sr.reveal('.sr-icon-2', {
    delay: 300,
    scale: 0
  });
  sr.reveal('.sr-icon-3', {
    delay: 450,
    scale: 0
  });
  sr.reveal('.sr-icon-4', {
    delay: 600,
    scale: 0
  });
  sr.reveal('.sr-icon-5', {
    delay: 750,
    scale: 0
  });
  sr.reveal('.sr-button', {
    delay: 200,
    distance: '15px',
    origin: 'bottom',
    scale: 0.8
  });
  sr.reveal('.sr-contact-1', {
    delay: 200,
    scale: 0
  });
  sr.reveal('.sr-contact-2', {
    delay: 400,
    scale: 0
  });
  sr.reveal('.sr-article-1', {
    delay: 100,
    scale: 0
  });
  



  function create_article(article){
    let article_div = document.createElement('div')
    let article_a = document.createElement('a')
    let article_img = document.createElement('img')
    let article_div_box = document.createElement('div')
    let article_div_box_cont = document.createElement('div')
    // let article_div_box_cat = document.createElement('div')
    let article_div_box_name = document.createElement('div')

    article_div.className = 'col-lg-4 col-sm-6 sr-img'

    article_a.className = 'portfolio-box'
    article_a.href = window.location.origin + "/articles/" + article['filename']


    article_img.className = 'img-fluid'
    article_img.src = Flask.url_for("static", { "filename": "img/articles/" + article['imagefilename'] })
    
    article_img.alt = 'gap'

    article_div_box.className = 'portfolio-box-caption'

    article_div_box_cont.className = 'portfolio-box-caption-content'

    // article_div_box_cat.className = 'project-category text-faded'
    // article_div_box_cat.innerHTML = article['categorie']

    article_div_box_name.className = 'project-name text-uppercase font-weight-bold'
    article_div_box_name.innerHTML = article['name']

    // article_div_box_cont.appendChild(article_div_box_cat)
    article_div_box_cont.appendChild(article_div_box_name)
    article_div_box.appendChild(article_div_box_cont)
    article_a.appendChild(article_img)
    article_a.appendChild(article_div_box)
    article_div.appendChild(article_a)

    
    document.getElementById('articles-set').appendChild(article_div)

    sr.reveal('.sr-img', {
      delay: 200,
      scale: 0
    });
  };

  function create_categorie(categorie) {
    let categorie_a = document.createElement('span')
    categorie_a.className = 'dropdown-item'
    categorie_a.style.cursor = 'pointer'
    categorie_a.innerHTML = categorie
    categorie_a.onclick = function(e){
      if(e.target.textContent != state_categorie){
        state_categorie = e.target.textContent
        create_articles(articles, state_categorie)
      }

      }

    document.getElementById('categories-drop').appendChild(categorie_a)
  }


  function create_articles(articles, categorie) {
    document.getElementById('categorie-state').innerHTML = categorie
    document.getElementById('articles-set').innerHTML = ""   
    articles.filter(article => article['categorie'] == categorie)
    .map(create_article)
  }

  function create_categories(categories) {
    categories.map(create_categorie)
  }

  let articles, categories, state_categorie


  function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }

  function json(response) {
    return response.json()
  }

  // fetch('http://localhost:8000/init/articles')
  fetch('http://paulorocha.herokuapp.com/init/articles')
    .then(status)
    .then(json)
    .then(function(data){
      articles = data['articles']
      categories = data['categories']
      state_categorie = categories[0]
      create_articles(articles, state_categorie)
      create_categories(categories)
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });

 
  // // Magnific popup calls
  // $('.popup-gallery').magnificPopup({
  //   delegate: 'a',
  //   type: 'image',
  //   tLoading: 'Loading image #%curr%...',
  //   mainClass: 'mfp-img-mobile',
  //   gallery: {
  //     enabled: true,
  //     navigateByImgClick: true,
  //     preload: [0, 1]
  //   },
  //   image: {
  //     tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
  //   }
  // });



})(jQuery); // End of use strict
