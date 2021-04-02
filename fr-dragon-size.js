// ==UserScript==
// @name         Flight Rising: Auction House - Dragon - Image Increase, Card Style
// @author       https://greasyfork.org/en/users/547396
// @description  Increases the size of dragon images on the auction house. Set card style display for easier browsing (optional).
// @namespace    https://greasyfork.org/users/547396
// @match        https://*.flightrising.com/auction-house/buy/*/dragons*
// @grant        none
// @version      2.0
// ==/UserScript==

(function() {
    'use strict';

    // Settings
    const cardStyle = true, // true: display as cards | false: default
          minimalData = false; // if cardStyle is true - true: remove excess data for quicker browsing | false: default

    let globalSettings = [ cardStyle, minimalData ];

    // let's goooo
    init();

    function init() {
        const dragonRow = document.getElementsByClassName('ah-listing-row'),
              listingContainer = document.getElementById('ah-content');

        restyleContainer( listingContainer, globalSettings[0], globalSettings[1] );
        defineElements( dragonRow );
    }

    function defineElements( dragonRow ) {
        let dragon;

        for ( dragon of dragonRow ) {
            let icon = dragon.querySelector('.ah-listing-dragon-icon'),
                image = icon.getElementsByTagName('img'),
                imageSrc = image[0].src,
                content = dragon.querySelector('.ah-listing-left'),
                elements = dragon.querySelector('.ah-listing-center'),
                price = dragon.querySelector('.ah-listing-right');

            image[0].src = updateImageSizes( imageSrc );

            applyStyles( globalSettings, icon, dragon, content, elements, price );
        }
    }

    function updateImageSizes( imageSrc ) {
        imageSrc = imageSrc.replace('avatars', '350');
        imageSrc = imageSrc.replace('.png', '_350.png');

        return imageSrc;
    }

    function applyStyles( settingStyle, icon, dragon, content, elements, price ) {
        let energyBar = dragon.getElementsByClassName('ah-energy-bar')[0],
            coliLevel = dragon.getElementsByClassName('ah-coli-level')[0],
            sellPrice = dragon.getElementsByClassName('ah-listing-sellprice')[0],
            sellPriceLabel = sellPrice.getElementsByTagName('div')[0],
            buyButton = dragon.getElementsByClassName('ah-listing-buy-button')[0],
            currency = dragon.getElementsByClassName('ah-listing-currency')[0],
            cost = dragon.getElementsByClassName('ah-listing-cost')[0],
            dragonID = dragon.getElementsByClassName('ah-dragon-id')[0],
            expiry = dragon.getElementsByClassName('ah-listing-expiry')[0],
            barFg = dragon.getElementsByClassName('ah-energy-bar-fg')[0],
            currencyIcon = dragon.getElementsByClassName('ah-listing-currency-icon')[0];

        icon.style.width = '135px';
        icon.style.height = '135px';
        icon.style.margin = '-10px 0 0 0';

        if ( settingStyle[0] == true ) {
            dragon.style.flex = '0 0 25%';
            dragon.style.boxSizing = 'border-box';
            dragon.style.height = '330px';
            dragon.style.overflow = 'hidden';
            dragon.style.borderRight = '1px solid silver';
            dragon.style.padding = '10px';
            content.style.position = 'relative';
            elements.style.position = 'relative';
            price.style.position = 'relative';
            content.style.left = '0';
            elements.style.left = '0';
            price.style.left = '0';
            content.style.top = '20px';
            elements.style.top = '25px';
            price.style.top = '20px';
            price.style.textAlign = 'left';
            sellPriceLabel.style.display = 'none';
            sellPrice.style.height = 'auto';
            currency.style.marginBottom = '10px';
            buyButton.style.width = '100%';
            buyButton.style.height = '40px';
            buyButton.style.padding = '0';
            buyButton.style.textAlign = 'center';
            buyButton.style.margin = '0';
            buyButton.style.fontSize = '20px';
            buyButton.style.lineHeight = '2';
            buyButton.style.backgroundImage = 'none';
            buyButton.innerText = 'BUY';
            buyButton.classList.add('redbutton');
            buyButton.classList.add('anybutton');
            dragonID.style.fontSize = '8px';
            coliLevel.style.fontSize = '8px';
            coliLevel.style.textAlign = 'right';
            coliLevel.style.float = 'right';
            coliLevel.style.marginTop = '-17px';
            expiry.style.fontSize = '8px';
            expiry.style.height = '20px';
            expiry.style.marginTop = '-5px';
            energyBar.style.width = '50px';
            energyBar.style.float = 'right';
            energyBar.style.margin = '-25px 0 0';
            cost.style.fontSize = '15px';
            currencyIcon.style.width = '17px';
            currencyIcon.style.height = '17px';
            currencyIcon.style.bottom = '0';
            barFg.style.backgroundSize = '100% 100%';

            // bigger!!!!
            icon.style.width = '155px';
            icon.style.height = '155px';
            icon.style.margin = '-25px 0 0 0';
        } else {
            dragon.style.height = '150px';
            content.style.left = '150px';
            content.style.top = '52px';
            elements.style.top = '52px';
            elements.style.left = '410px';
            price.style.top = '52px';
        }

        if ( settingStyle[1] == true && settingStyle[0] == true ) {
            expiry.style.display = 'none';
            energyBar.style.display = 'none';
            coliLevel.style.display = 'none';
            elements.style.top = '15px';
            price.style.top = '5px';
            dragon.style.height = '300px';
        }
    }

    function restyleContainer( parent, style ) {
        const rows = document.querySelectorAll('div#ah-content > div');

        if ( style == true ) {
            parent.style.display = 'flex';
            parent.style.flexWrap = 'wrap';

            for ( let div of rows ) {
                 div.style.flex = '0 0 100%';
            }
        }
    }

})();