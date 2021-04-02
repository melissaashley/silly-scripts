// ==UserScript==
// @name         Flight Rising: Predict Morphology (Scry) - Next Option
// @description  Adds a button to select the next option for each dropdown. Automatically predicts, removing excess clicks
// @namespace    https://greasyfork.org/en/users/547396
// @author       https://greasyfork.org/en/users/547396
// @match        *://*.flightrising.com/scrying/predict*
// @grant        none
// @version      0.1
// ==/UserScript==
 
(function() {
    'use strict';
 
    const container = document.getElementById('predict-morphology'),
          optionsBlock = container.getElementsByClassName('scry-options')[0],
          commonRows = optionsBlock.getElementsByClassName('common-row'),
          predictBtn = document.getElementById('scry-button');
 
    // do it!
    init();
 
    function init() {
        console.log(predictBtn);
        for ( let row of commonRows ) {
 
            let selector = row.getElementsByTagName('select')[0],
                selectName = selector.name,
                col = selector.parentNode;
 
            selector.style.width = '80%';
 
            appendDownSelect( col, selector, selectName );
        }
    }
 
    // append next button
    function appendDownSelect( col, selector, name ) {
        const downAction = document.createElement('button');
 
        downAction.innerHTML = '&#8609;';
        downAction.name = name;
 
        col.appendChild(downAction);
 
        downAction.addEventListener('click', changeSelect.bind( event, selector, name ), false);
    }
 
    // select next option, ignoring all disabled options
    function changeSelect( selector, name, e ){
        const select = selector;
 
        let currentIndex = select.selectedIndex,
            collection = [...select.options],
            collectionArr = [],
            i = 0,
            nextItemIndex;
 
        for ( i; i < collection.length; i++ ) {
            if ( collection[i].disabled == false ) {
                collectionArr.push( collection[i].index );
            }
        }
 
        nextItemIndex = collectionArr.indexOf(currentIndex) + 1;
 
        select.selectedIndex = collectionArr[nextItemIndex];
 
        predict();
    }
 
    // trigger predict
    function predict() {
        predictBtn.click();
    }
 
})();