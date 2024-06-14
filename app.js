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
            horizontalLine.style.height = '1px';
            horizontalLine.style.backgroundColor = 'black';
            horizontalLine.style.zIndex = '9999';
            horizontalLine.style.position = 'fixed';
            horizontalLine.style.top = '50%';
            horizontalLine.style.left = '0';
            horizontalLine.style.cursor = 'move';
            horizontalLine.style.margin = '10px';
            horizontalLine.setAttribute("class", "horizontal-line")
            document.body.appendChild(horizontalLine);
            let isClicked = false;
            let mousePosition;

            function moveLine(e) {
              mousePosition = e.clientY;
              horizontalLine.style.top = `${mousePosition - 10}px`;
              document.body.style.cursor = "move";
            }

            horizontalLine.addEventListener("click", (e) => {
              isClicked = !isClicked;
              if (isClicked) {
                document.addEventListener('mousemove', moveLine);
              } else {
                document.removeEventListener("mousemove", moveLine);
                document.body.style.cursor = "default";
              }
            })

            // Event handler for mousemove event
            // document.addEventListener('mousemove', (e) => {
            //   if (isDragging) {
            //     const deltaY = e.clientY - startY;
            //     horizontalLine.style.top = `${startTop + deltaY}px`;
            //   }
            // });

            // Event handler for mouseup event
            // document.addEventListener('mouseup', () => {
            //   if (isDragging) {
            //     isDragging = false;
            //     document.body.style.cursor = 'default'; // Revert cursor after dragging
            //   }
            // });
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
            allLines.forEach(element => {
              element.remove();
            });
          },
        }
      );
    });
  })

});