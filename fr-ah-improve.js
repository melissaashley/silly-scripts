// ==UserScript==
// @name         Flight Rising - Auction House Improvements (Seller)
// @author       https://greasyfork.org/en/users/547396
// @description  Adds search link to selected items on auction house. Sets currency to gems and duration to 7 days.
// @namespace    https://greasyfork.org/users/547396
// @match        https://*.flightrising.com/auction-house/sell/realm/*
// @grant        none
// @version      0.12
// ==/UserScript==
 
(function() {
    'use strict';
 
    let clickPanel = document.getElementById('ah-sell-left'),
        sellItem = document.getElementById('ah-sell-itemname'),
        sURL = window.location.href,
        bURL = sURL.replace('sell', 'buy');
 
    function init() {
        createButton( sellItem.innerText );
        selectGemsDays();
    }
 
    clickPanel.addEventListener('click', function ( e ) {
        let itemName = e.path[1].dataset.name;
 
        createButton( itemName );
        selectGemsDays();
    });
 
    function createButton( item ) {
        let ahButton = document.createElement('a');
 
        ahButton.href = bURL + '?itemname=' + item;
        ahButton.target = '_blank';
        ahButton.innerText = 'Auction House →';
 
        // Styles
        ahButton.classList.add('redbutton');
        ahButton.classList.add('anybutton');
        ahButton.style.display = 'block';
        ahButton.style.margin = '10px auto';
        ahButton.style.padding = '5px 8px';
        ahButton.style.fontSize = '10px';
        ahButton.style.width = '100px';
 
        if ( sURL.toString().indexOf('dragons') <= -1 ){
            sellItem.appendChild(ahButton);
        }
    }
 
    // Automatically select gems and 7 days
    function selectGemsDays() {
        let gems = document.getElementById('ah-sell-currency-gems'),
            days = document.getElementById('ah-sell-duration');
 
        // Comment out if you do not want gems/7 days auto-selected
        gems.checked = true;
        days.options.selectedIndex = 2;
    }
 
    init();
 
})();