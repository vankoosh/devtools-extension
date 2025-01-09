const addRulerBtn = document.querySelector(".add-ruler-button");

document.addEventListener("DOMContentLoaded", () => {
  addRulerBtn?.addEventListener("click", e => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          function: () => {
            const horizontalLine = document.createElement('div')
            const verticalLine = document.createElement('div')
            horizontalLine.setAttribute('class', 'horizontal-line')
            verticalLine.setAttribute('class', 'vertical-line')
            horizontalLine.style.position = 'absolute'
            verticalLine.style.position = 'absolute'
            horizontalLine.style.width = '100%'
            verticalLine.style.height = '100%'
            horizontalLine.style.height = '1px'
            verticalLine.style.width = '1px'
            horizontalLine.style.backgroundColor = 'yellow'
            verticalLine.style.backgroundColor = 'yellow'
            verticalLine.style.top = '0'
            document.body.appendChild(horizontalLine)
            document.body.appendChild(verticalLine)
            document.querySelectorAll('body *').forEach(e => {
              if (e.tagName == 'A') {
                e.

              }
            })
            document.body.onmousemove = (e) => {
              horizontalLine.style.top = e.clientY.toString() + 'px'
              verticalLine.style.left = e.clientX.toString() + 'px'
            }
          },
        }
      )
    })
  })
})