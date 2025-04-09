// @ts-nocheck
//https://developer.chrome.com/docs/extensions/reference/manifest#register-a-content-script

const addRulerBtn = document.querySelector(".add-ruler-button");
let scrollbarWidth = 0;

document.addEventListener("DOMContentLoaded", () => {
  addRulerBtn?.addEventListener("click", e => {
    // chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    //   const tabId = tabs[0].id;
    //   chrome.scripting.executeScript(
    //     {
    //       target: { tabId: tabId },
    //       function: () => {
    //         (() => { // get scrollbar width on extension button click
    //           const outer = document.createElement('div');
    //           outer.style.visibility = 'hidden';
    //           outer.style.overflow = 'scroll';
    //           document.body.appendChild(outer);
    //           const inner = document.createElement('div');
    //           outer.appendChild(inner);
    //           const sbWidth = outer.offsetWidth - inner.offsetWidth;
    //           outer.parentNode?.removeChild(outer);
    //           scrollbarWidth = sbWidth;
    //         })();

    //         createLine('horizontal-line line', 'position: absolute; width: 100%; height: 1px; background-color: black; left: 0px; top:100px; z-index: 999');
    //         createLine('vertical-line line', 'position: absolute; height: 100%; width: 1px; background-color: black; top: 0px; left: 100px; z-index: 999');
    //         document.body.style.overflow = 'hidden';
    //         document.body.style.marginRight = `${scrollbarWidth}px`;

    //         document.body.addEventListener('mousemove', (e) => {
    //           const horizontalLine = document.querySelector('.horizontal-line');
    //           const verticalLine = document.querySelector('.vertical-line');

    //           horizontalLine.style.top = e.clientY.toString() + 'px'
    //           verticalLine.style.left = e.clientX.toString() + 'px'
    //         })

    //         document.body.addEventListener('click', (e) => {
    //           const hasLines = document.querySelectorAll('.line').length < 1;
    //           console.log(document.querySelectorAll('.line'));
    //           if (!false) {
    //             createLine(`horizontal-line-2 line', 'position: absolute; width: 100%; height: 1px; background-color: black; left: 0px; top:${e.clientY.toString()}px; z-index: 999`);
    //             createLine(`vertical-line-2 line', 'position: absolute; height: 100%; width: 1px; background-color: black; top: 0px; left: ${e.clientX.toString()}px; z-index: 999`);
    //           }
    //         })

    //         window.addEventListener('keydown', (e) => { // remove ruler on escape key
    //           if (e.key == 'Escape') {
    //             document.querySelectorAll(".line").forEach((line) => {
    //               line.remove();
    //             });
    //             document.body.style.overflow = "";
    //             document.body.style.marginRight = "";
    //           }
    //         })

    //         function createLine(className, style) { // create line function
    //           const line = Object.assign(document.createElement('div'), {
    //             className: className,
    //             style: style
    //           });
    //           document.body.appendChild(line);
    //           return line;
    //         }
    //       },
    //     }
    //   )
    // })
  })
})

chrome.tabs.onCreated.addListener(function (tab) {
  console.log("New tab detected, ID:", tab.id, "URL:", tab.pendingUrl || tab.url);

  chrome.tabs.remove(tab.id, function () {
    if (chrome.runtime.lastError) {
      console.error("Error closing tab:", chrome.runtime.lastError.message);
    } else {
      console.log("Successfully closed tab ID:", tab.id);
    }
  });
});