'use strict';

// Constructor
var Header = function() {
  var header = $('.header');
  var body = $('body');
  var menuOpen = $('.header__hamburguer');
  var menuLinks = $('.header__menu a');

  menuOpen.on('click', function(){
    header.toggleClass('-open');
    body.toggleClass('-hideOverflow');
  });

  menuLinks.on('click', function(){
    header.removeClass('-open');
    body.removeClass('-hideOverflow');
  });
};

module.exports = Header;
