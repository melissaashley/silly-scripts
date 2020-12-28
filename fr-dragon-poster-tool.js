// ==UserScript==
// @name         Necra's Dragon Poster Tool
// @author       https://greasyfork.org/en/users/547396
// @description  A tool to grab specific data (id, name, image url) from dragon bios to handle/parse elsewhere. Uses localStorage to retain information between dragons. Requires scry image in bio.
// @namespace    https://greasyfork.org/users/547396
// @match        https://www1.flightrising.com/dragon/*
// @grant        none
// @version      0.11
// ==/UserScript==

(function() {
    'use strict';

    // quick ugly css (don't look at me)
    const css = '#dataBar{position:fixed;left:0;top:0;padding:.25rem 1rem 1rem;background:#e8cd38;z-index:999;width:150px;font-size:10px;}textarea{width:1px;height:1px;border:0;outline:none;}#dataMessage{font-style:italic;}#dataBar h3,#dataMessage{font-family:courier;margin:.5rem 0;}#btns{display:flex;flex-wrap:wrap;box-sizing:border-box;}#btns button{flex:0 0 46%;max-width:50%;border:2px solid #000;outline:0;cursor:pointer;background:#000;color:#fff;font-family:courier;padding:.25rem .5rem;line-height:1.5;font-size:9px; margin:2%;}#btns button:hover,#btns button:focus{background:transparent!important;color:#000;}#btns button:nth-child(3){background:#333;}#btns button:last-child{background:#a57917;}';

    // check if user is current user, if so init
    checkUser();

    function checkUser() {
        const getUser = getEl('namespan').getElementsByTagName('span')[0].innerText,
              getLair = document.getElementsByClassName('breadcrumbs')[0].getElementsByTagName('a')[0].innerText;

        if (getUser === getLair) {
            init();
        }
    }

    // initialize
    function init() {
        let bar = createBar(),
            dataArr = getLocalStorage();

        addActions( bar );

        if (dataArr.length !== 0) {
            buildData( dataArr );
        }
    }

    // create bar
    function createBar() {
        let body = document.body,
            style = createEl('style'),
            cssNode = document.createTextNode(css),
            dataBar = createEl('div'),
            title = createEl('h3'),
            titleNode = document.createTextNode('Dragon Poster Tool'),
            dataStore = createEl('div'),
            dataMessage = document.createElement('div'),
            dataClipboard = document.createElement('textarea');

        style.appendChild(cssNode);
        body.appendChild(style);
        body.appendChild(dataBar);

        dataBar.appendChild(title);
        title.appendChild(titleNode);

        dataBar.appendChild(dataStore);
        dataBar.appendChild(dataClipboard);
        dataBar.appendChild(dataMessage);

        dataBar.setAttribute('id','dataBar');
        dataMessage.setAttribute('id','dataMessage');
        dataStore.setAttribute('id','dataStore');
        dataClipboard.setAttribute('id','dataClipboard');

        return dataBar;
    }

    // add action buttons
    function addActions( bar ) {
        let addDragon = createEl('button'),
            clear = createEl('button'),
            reset = createEl('button'),
            copy = createEl('button'),
            btnContainer = createEl('div');

        addDragon.innerText = 'Add';
        clear.innerText = 'Remove';
        reset.innerText = 'Reset';
        copy.innerText = 'Copy';

        btnContainer.appendChild(addDragon);
        btnContainer.appendChild(clear);
        btnContainer.appendChild(reset);
        btnContainer.appendChild(copy);

        bar.appendChild(btnContainer);
        btnContainer.setAttribute('id','btns');

        addDragon.addEventListener('click', checkDragon);
        clear.addEventListener('click', clearDragon);
        reset.addEventListener('click', clearAll);
        copy.addEventListener('click', copyToClipboard);
    }

    // check if dragon meets standards
    function checkDragon() {
        let current = getCurrentDragon(),
            scry = current[2];

        let response = ( scry == '' ) ? error('Dragon cannot be added, no scry in bio') : setLocalStorage( current );

        return response;
    }

    // parse data for input
    function buildData( dataArr ) {
        let idArr = [],
            count = 0,
            dataStore = getEl('dataStore'),
            dataClipboard = getEl('dataClipboard');

        for ( let item in dataArr ) {
            count++;
            idArr.push(dataArr[item][0]);
        }

        dataStore.innerHTML = "Current Dragons (" + count + "): " + idArr.join(", ");
        dataClipboard.value = dataArr.join("\n");
    }

    // local storage events
    function setLocalStorage( dragon ) {
        let current = dragon;
        let did = 'dragon-' + current[0];

        localStorage.setItem( did, JSON.stringify(current) );
        success('Dragon Added');

        // refresh the data
        buildData( getLocalStorage() );
    }

    function getLocalStorage() {
        let storedDragons = [];

        Object.keys(localStorage).forEach(function(key){

            if (key.includes('dragon-')) {
                storedDragons.push(JSON.parse(localStorage.getItem(key)));
            }
        });

        return storedDragons;
    }

    function clearDragon() {
        let current = getCurrentDragon(),
            did = 'dragon-' + current[0];

        localStorage.removeItem( did );
        success('Dragon Removed');

        // refresh the data
        buildData( getLocalStorage() );
    }

    // wipe all storage for domain (not the best, should be based on current keys)
    function clearAll() {
        localStorage.clear();

        success('Data Reset');

        // refresh the data
        buildData( getLocalStorage() );
    }

    // copy data to clipboard
    function copyToClipboard() {
        let dataInput = getEl( 'dataClipboard' );

        dataInput.select();
        dataInput.setSelectionRange(0, 99999); // ??
        document.execCommand('copy');

        success('Copied to clipboard');
    }

    // get current dragon and return as an array
    function getCurrentDragon() {
        let dragon = [];

        let dragonID = document.getElementsByClassName('dragon-profile-header-number')[0].innerText,
            nID = dragonID.substring(2, dragonID.length-1),
            dragonName = document.getElementsByClassName('dragon-profile-header-name')[0].innerText,
            dragonBio = document.getElementsByClassName('dragon-profile-bio-text')[0],
            bioImages = dragonBio.getElementsByTagName('IMG'),
            dragonScry = '';

        for (let item of bioImages) {
            if ( item.src.includes('preview/dragon') ) {
                dragonScry = item.src;
            }
        }

        dragon = [nID,dragonName,dragonScry];

        return dragon;
    }

    // helpers
    function createEl( type ) {
       return document.createElement( type );
    }

    function getEl( idName ) {
       return document.getElementById( idName );
    }

    function error( message ) {
        alert( message );
    }

    function success( message ) {
        let success = getEl('dataMessage');

        success.innerText = message;
    }
})();