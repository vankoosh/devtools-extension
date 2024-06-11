document.addEventListener("DOMContentLoaded", function (e) {
  const addLineBtn = document.getElementById("addLine");
  const deleteLinesBtn = document.getElementById("deleteLines");

  addLineBtn.addEventListener("click", () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          function: () => {
            const horizontalLine = document.createElement("span");
            horizontalLine.style.width = '100vw';
            horizontalLine.style.height = '2px';
            horizontalLine.style.backgroundColor = 'black';
            horizontalLine.style.zIndex = '9999';
            horizontalLine.style.position = 'absolute';
            horizontalLine.style.top = '50%';
            horizontalLine.style.left = '0';
            horizontalLine.style.cursor = 'pointer';
            horizontalLine.style.margin = '10px';
            horizontalLine.setAttribute("class", "horizontal-line")

            document.body.appendChild(horizontalLine);

            let isDragging = false;
            let startY = 0;
            let startTop = 0;

            // Event handler for mousedown event
            horizontalLine.addEventListener('mousedown', (e) => {
              isDragging = true;
              startY = e.clientY;
              startTop = horizontalLine.offsetTop;
              document.body.style.cursor = 'pointer'; // Change cursor while dragging
            });

            // Event handler for mousemove event
            document.addEventListener('mousemove', (e) => {
              if (isDragging) {
                const deltaY = e.clientY - startY;
                horizontalLine.style.top = `${startTop + deltaY}px`;
              }
            });

            // Event handler for mouseup event
            document.addEventListener('mouseup', () => {
              if (isDragging) {
                isDragging = false;
                document.body.style.cursor = 'default'; // Revert cursor after dragging
              }
            });
          },
        }
      );
    });
  });

  deleteLinesBtn.addEventListener("click", () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          function: () => {
            const allLines = document.querySelectorAll(".horizontal-line");
            console.log(allLines);
            allLines.forEach(element => {
              element.remove();
            });
          },
        }
      );
    });
  })

});