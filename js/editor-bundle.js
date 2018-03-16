(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var cssEditor = document.getElementById('css-editor');
var htmlEditor = document.getElementById('html-editor');
var staticHTMLCode = htmlEditor.querySelector('pre');
var staticCSSCode = cssEditor.querySelector('pre');
var tabContainer = document.getElementById('tab-container');
var tabs = tabContainer.querySelectorAll('button[role="tab"]');
var tabList = document.getElementById('tablist');

/**
 * Hides all tabpanels
 */
function hideTabPanels() {
    // get all section with a role of tabpanel
    var tabPanels = tabContainer.querySelectorAll('[role="tabpanel"]');

    // hide all tabpanels
    for (var panel of tabPanels) {
        panel.classList.add('hidden');
    }
}

/**
 * Sets the newly activated tab as active, and ensures that
 * the previously active tab is unset.
 * @param {Object} nextActiveTab - The tab to activate
 * @param {Object} [activeTab] - The current active tab
 */
function setActiveTab(nextActiveTab, activeTab) {
    if (activeTab) {
        // set the currentSelectedTab to false
        activeTab.setAttribute('aria-selected', false);
        activeTab.setAttribute('tabindex', -1);
    }

    // set the activated tab to selected
    nextActiveTab.setAttribute('aria-selected', true);
    nextActiveTab.removeAttribute('tabindex');
    nextActiveTab.focus();
}

/**
 * Handles moving focus and activating the next tab in either direction,
 * based on arrow key events
 * @param {String} direction - The direction in which to move tab focus
 * Must be either forward, or reverse.
 */
function setNextActiveTab(direction) {
    var activeTab = tabList.querySelector('button[aria-selected="true"]');

    // if the direction specified is not valid, simply return
    if (direction !== 'forward' && direction !== 'reverse') {
        return;
    }

    if (direction === 'forward') {
        if (activeTab.nextElementSibling) {
            setActiveTab(activeTab.nextElementSibling, activeTab);
            activeTab.nextElementSibling.click();
        } else {
            // reached the last tab, loop back to the first tab
            setActiveTab(tabs[0]);
            tabs[0].click();
        }
    } else if (direction === 'reverse') {
        if (activeTab.previousElementSibling) {
            setActiveTab(activeTab.previousElementSibling, activeTab);
            activeTab.previousElementSibling.click();
        } else {
            // reached the first tab, loop around to the last tab
            setActiveTab(tabs[tabs.length - 1]);
            tabs[tabs.length - 1].click();
        }
    }
}

module.exports = {
    editors: {
        html: {
            editor: undefined,
            code: htmlEditor,
            config: {
                lineNumbers: true,
                mode: 'htmlmixed',
                value: staticHTMLCode.querySelector('code').textContent
            }
        },
        css: {
            editor: undefined,
            code: cssEditor,
            config: {
                lineNumbers: true,
                mode: 'css',
                value: staticCSSCode.querySelector('code').textContent
            }
        }
    },
    /**
     * Initialise the specified editor if not already initialised
     * @param {Array} editorTypes - The editors to initialise
     */
    initEditor: function(editorTypes) {
        for (var editor of editorTypes) {
            // eslint-disable-next-line new-cap
            this.editors[editor].editor = CodeMirror(
                this.editors[editor].code,
                this.editors[editor].config
            );
        }
    },
    /**
     * Registers the required click and keyboard event listeners
     */
    registerEventListeners: function() {
        tabList.addEventListener('click', function(event) {
            var eventTarget = event.target;
            var role = eventTarget.getAttribute('role');

            if (role === 'tab') {
                var activeTab = tabList.querySelector(
                    'button[aria-selected="true"]'
                );
                var selectedPanel = document.getElementById(
                    eventTarget.getAttribute('aria-controls')
                );

                hideTabPanels();
                setActiveTab(eventTarget, activeTab);

                // now show the selected tabpanel
                selectedPanel.classList.remove('hidden');
                // refresh the CodeMirror UI for this view
                module.exports.editors[eventTarget.id].editor.refresh();
            }
        });

        tabList.addEventListener('keyup', function(event) {
            event.stopPropagation();
            switch (event.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                setNextActiveTab('forward');
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                setNextActiveTab('reverse');
                break;
            case 'Home':
                setActiveTab(tabs[0]);
                break;
            case 'End':
                setActiveTab(tabs[tabs.length - 1]);
                break;
            case 'default':
                return;
            }
        });
    }
};

},{}],2:[function(require,module,exports){
(function() {
    'use strict';

    var tabby = require('./editor-libs/tabby');

    var cssEditor = document.getElementById('css-editor');
    var header = document.querySelector('.output-header');
    var htmlEditor = document.getElementById('html-editor');
    var staticCSSCode = cssEditor.querySelector('pre');
    var staticHTMLCode = htmlEditor.querySelector('pre');
    var output = document.getElementById('output');
    var timer;

    /**
     * Called by the tabbed editor to combine code from all tabs.
     * @returns Concatenated code from all tabs
     */
    function getOutput() {
        var html = tabby.editors.html.editor.getValue();
        var style = '<style>' + tabby.editors.css.editor.getValue() + '</style>';
        return style + html;
    }

    /**
     * Called from the editors on keyup events. Starts a 500 millisecond timer.
     * If no other keyup events happens before the 500 millisecond have elapsed,
     * update the output
     */
    function autoUpdate() {
        // clear the existing timer
        clearTimeout(timer);

        timer = setTimeout(function() {
            output.innerHTML = getOutput();
        }, 500);
    }

    header.addEventListener('click', function(event) {
        if (event.target.classList.contains('reset')) {
            window.location.reload();
        }
    });

    htmlEditor.addEventListener('keyup', function() {
        autoUpdate();
    });

    cssEditor.addEventListener('keyup', function() {
        autoUpdate();
    });

    // hide the static example when JS enabled
    staticHTMLCode.classList.add('hidden');
    // hide the static CSS example
    staticCSSCode.classList.add('hidden');
    // show the header
    header.classList.remove('hidden');

    // initialise the editors
    tabby.initEditor(['html', 'css']);
    tabby.registerEventListeners();

    // apply the current source on load
    output.innerHTML = getOutput();
})();

},{"./editor-libs/tabby":1}]},{},[2]);
