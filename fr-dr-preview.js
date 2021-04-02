// ==UserScript==
// @name         Flight Rising: Dressing Room Previewer
// @description  Hover items to preview on current model (dragon or scry).
// @namespace    https://greasyfork.org/en/users/547396
// @author       https://greasyfork.org/en/users/547396
// @match        *://*.flightrising.com/dressing/*
// @grant        none
// @version      0.2
// ==/UserScript==
 
(function() {
    'use strict';
 
    const headerDr = document.getElementById('dr-apparel-widget-header'),
          headerInput = document.getElementsByName('dr-apparel-filter-name')[0],
          footerDr = document.getElementById('dr-apparel-widget-footer'),
          morphBtn = document.getElementById('search-morphologies'),
          dragonBtn = document.getElementById('search-dragons'),
          outfitBox = document.getElementById('dr-apparel-selected'),
          outfitTitle = outfitBox.getElementsByClassName('dr-apparel-widget-title')[0],
          searchReturn = document.getElementById('dr-apparel-search-results'),
          timeDelay = 2000,
          loadMessage = document.createElement('div'),
          previewBox = document.createElement('div'),
          previewImg = document.createElement('img');
 
    let itemArr = [];
    let imgType;
    let dragonID;
 
    loadMessage.style.float = 'left';
    loadMessage.innerText = '';
    headerDr.appendChild(loadMessage);
    outfitTitle.appendChild(previewBox);
    previewBox.appendChild(previewImg);
    previewImg.setAttribute('width','198');
    previewBox.style.border = '1px solid #ccc';
    previewBox.style.margin = '5px 0 0 5px';
    previewBox.style.width = '198px';
    previewBox.style.height = '198px';
 
    // event listeners
    headerDr.addEventListener('click', refreshItems);
    footerDr.addEventListener('click', refreshItems);
    morphBtn.addEventListener('click', init);
    dragonBtn.addEventListener('click', init);
    headerInput.addEventListener('keyup', refreshItems);
 
    // lets gooo
    init();
 
    function init() {
        previewImg.src = ''; // reset
        console.log('init');
 
        setTimeout(function(){
            getCurrDragon();
        }, 2000);
    }
 
    function getCurrDragon() {
        let dragonBox = document.getElementById('dragon-image-box');
        let dragonImage = dragonBox.getElementsByTagName('img')[0].src;
 
        let urlString = dragonImage.toString();
        let url = new URL(urlString);
 
        dragonID = url.searchParams.get('did') || url.searchParams.get('sdid');
        imgType = (urlString.includes('scry')) ? 'scry' : 'dragon';
 
        previewImg.src = buildUrl( imgType, dragonID );
    }
 
    function refreshItems() {
        let results = searchReturn.getElementsByClassName('items')[0];
 
        loadMessage.innerText = '...';
 
        setTimeout(function(){
            itemsRendered( results );
            pagination( results );
        }, timeDelay);
    }
 
    function itemsRendered( results ) {
        let items = results.querySelectorAll('div.fayt-search-item');
            itemArr = [];
 
            for (let item of items) {
                let itemId = item.getAttribute('data-itemid');
 
                itemArr.push(itemId);
                item.addEventListener('mouseenter', updatePreview);
            }
 
            if (itemArr.length > 0) {
                loadMessage.innerText = 'previews loaded';
            }
    }
 
    function pagination( results ) {
        let pageBlock = results.querySelector('.fayt-pagination');
 
        if (pageBlock) {
            pageBlock.addEventListener('click', refreshItems);
        }
    }
 
    function updatePreview( item ) {
        let itemId = item.target.getAttribute('data-itemid');
 
        previewImg.src = buildUrl(imgType, dragonID, itemId);
    }
 
    function buildUrl( type, id, apparel ) {
        let sord = ( type == 'dragon' ) ? 'd' : 'sd';
        let returnUrl = `https://www1.flightrising.com/dgen/dressing-room/${type}?${sord}id=${id}&skin=0&apparel=${apparel}&xt=dressing.png`;
 
        return returnUrl;
    }
 
})();