document.addEventListener("DOMContentLoaded", function (e) {
  const addHORLineBtn = document.getElementById("addHLine");
  const addVERLineBtn = document.getElementById("addVLine");
  const deleteLinesBtn = document.getElementById("deleteLines");

  addHORLineBtn.addEventListener("click", () => {
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
            // horizontalLine.style.margin = '10px';
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
          },
        }
      );
    });
  });

  addVERLineBtn.addEventListener("click", () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          function: () => {
            const verticalLine = document.createElement("span");
            verticalLine.style.width = '1px';
            verticalLine.style.height = '100vh';
            verticalLine.style.backgroundColor = 'black';
            verticalLine.style.zIndex = '9999';
            verticalLine.style.position = 'fixed';
            verticalLine.style.top = '0';
            verticalLine.style.left = '50%';
            verticalLine.style.cursor = 'move';
            // verticalLine.style.margin = '10px';
            verticalLine.setAttribute("class", "vertical-line")
            document.body.appendChild(verticalLine);
            let isClicked = false;
            let mousePosition;

            function moveLine(e) {
              mousePosition = e.clientX;
              verticalLine.style.left = `${mousePosition}px`;
              document.body.style.cursor = "move";
            }

            verticalLine.addEventListener("click", (e) => {
              isClicked = !isClicked;
              if (isClicked) {
                document.addEventListener('mousemove', moveLine);
              } else {
                document.removeEventListener("mousemove", moveLine);
                document.body.style.cursor = "default";
              }
            })
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
            const allHLines = document.querySelectorAll(".horizontal-line");
            const allVLines = document.querySelectorAll(".vertical-line");
            const allLines = [...allHLines, ...allVLines];
            allLines.forEach(element => {
              element.remove();
            });
          },
        }
      );
    });
  })
});