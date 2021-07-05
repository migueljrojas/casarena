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

  // Mundo

  var markersContext = $('.casarena-mundo__map-markers');
  var markers = [
    // America
    {
      country: 'Canada',
      email: 'ventas@casarena.can',
      posX: 22,
      posY: 18
    },
    {
      country: 'USA',
      email: 'ventas@casarena.usa',
      posX: 23.5,
      posY: 30
    },
    {
      country: 'Mexico',
      email: 'ventas@casarena.mex',
      posX: 22.8,
      posY: 41
    },
    {
      country: 'Puerto Rico',
      email: 'ventas@casarena.pr',
      posX: 31,
      posY: 44.5
    },
    {
      country: 'Panama',
      email: 'ventas@casarena.pan',
      posX: 28,
      posY: 53
    },
    {
      country: 'Colombia',
      email: 'ventas@casarena.co',
      posX: 29.65,
      posY: 55.5
    },
    {
      country: 'Costa Rica',
      email: 'ventas@casarena.cr',
      posX: 26.8,
      posY: 51.8
    },
    {
      country: 'Brasil',
      email: 'ventas@casarena.br',
      posX: 35,
      posY: 66
    },
    {
      country: 'Peru',
      email: 'ventas@casarena.peru',
      posX: 29,
      posY: 65.3
    },
    {
      country: 'Uruguay',
      email: 'ventas@casarena.uy',
      posX: 34,
      posY: 82.2
    },
    {
      country: 'Argentina',
      email: 'ventas@casarena.ar',
      posX: 32,
      posY: 82
    },
    {
      country: 'Paraguay',
      email: 'ventas@casarena.py',
      posX: 33.5,
      posY: 76
    },
    //europe
    {
      country: 'Francia',
      email: 'ventas@casarena.fr',
      posX: 47.5,
      posY: 25.5
    },
    {
      country: 'Rusia',
      email: 'ventas@casarena.ru',
      posX: 69,
      posY: 15
    },
    {
      country: 'Inglaterra',
      email: 'ventas@casarena.eng',
      posX: 46.8,
      posY: 20.5
    },
    {
      country: 'Irlanda',
      email: 'ventas@casarena.irl',
      posX: 45,
      posY: 20.5
    },
    {
      country: 'Suecia',
      email: 'ventas@casarena.swe',
      posX: 51,
      posY: 14
    },
    {
      country: 'Dinamarca',
      email: 'ventas@casarena.den',
      posX: 49,
      posY: 18.5
    },
    {
      country: 'Paises Bajos',
      email: 'ventas@casarena.neth',
      posX: 48.2,
      posY: 21.2
    },
    //Africa
    {
      country: 'Madagascar',
      email: 'ventas@casarena.mad',
      posX: 59.2,
      posY: 73
    },
    {
      country: 'EAU',
      email: 'ventas@casarena.eau',
      posX: 59.7,
      posY: 42
    },
    // Asia
    {
      country: 'China',
      email: 'ventas@casarena.ch',
      posX: 72.5,
      posY: 35.5
    },
    {
      country: 'Corea del Sur',
      email: 'ventas@casarena.kor',
      posX: 77,
      posY: 31.5
    },
    {
      country: 'Japon',
      email: 'ventas@casarena.jpn',
      posX: 79.5,
      posY: 32.5
    },
    {
      country: 'India',
      email: 'ventas@casarena.in',
      posX: 65.5,
      posY: 41.5
    },
    {
      country: 'Tailandia',
      email: 'ventas@casarena.thai',
      posX: 71,
      posY: 55
    },
    {
      country: 'Vietnam',
      email: 'ventas@casarena.viet',
      posX: 72.2,
      posY: 49
    },
    {
      country: 'Malasia',
      email: 'ventas@casarena.mal',
      posX: 70,
      posY: 47
    },
    {
      country: 'Hong Kong',
      email: 'ventas@casarena.hk',
      posX: 73.5,
      posY: 43.5
    }
  ];

  if (markersContext) {
    generateMarkers();
  }

  function generateMarkers() {
    for (var marker of markers) {
      var template = $.parseHTML(
        `<li class="casarena-mundo__map-marker" style="left: ${marker.posX}%; top: ${marker.posY}%;">
          <span class="casarena-mundo__map-marker__dot"></span>
          <div class="casarena-mundo__map-marker__info">
            <h3 class="casarena-mundo__map-marker__country">${marker.country}</h3>
            <div class="casarena-mundo__map-marker__mail">
              <span class="casarena-mundo__map-marker__mail-label">Ventas</span>
              <a href="mailto:${marker.email}" class="casarena-mundo__map-marker__mail-link">${marker.email}</a>
              <span class="casarena-mundo__map-marker__mail-icon"><i class="material-icons">mail_outline</i></span>
            </div>
          </div>
        </li>`
      );
      markersContext.append(template);
    }
  }
};

module.exports = Header;
