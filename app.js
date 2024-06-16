document.addEventListener("DOMContentLoaded", function (e) {
  const addHORLineBtn = document.getElementById("addHLine");
  const addVERLineBtn = document.getElementById("addVLine");
  const deleteLinesBtn = document.getElementById("deleteLines");
  const addRulerBtn = document.querySelector("#addRuler");

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

  addRulerBtn.addEventListener("click", () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          function: () => {
            const verticalLineOne = document.createElement("span");
            verticalLineOne.style.width = '1px';
            verticalLineOne.style.height = '100vh';
            verticalLineOne.style.backgroundColor = 'black';
            verticalLineOne.style.zIndex = '9999';
            verticalLineOne.style.position = 'fixed';
            verticalLineOne.style.top = '0';
            verticalLineOne.style.left = '40%';
            verticalLineOne.style.cursor = 'move';
            verticalLineOne.setAttribute("id", "vertical-line-one")
            verticalLineOne.setAttribute("class", "ver-ruler-line")
            document.body.appendChild(verticalLineOne);

            const verticalLineTwo = document.createElement("span");
            verticalLineTwo.style.width = '1px';
            verticalLineTwo.style.height = '100vh';
            verticalLineTwo.style.backgroundColor = 'black';
            verticalLineTwo.style.zIndex = '9999';
            verticalLineTwo.style.position = 'fixed';
            verticalLineTwo.style.top = '0';
            verticalLineTwo.style.left = '60%';
            verticalLineTwo.style.cursor = 'move';
            verticalLineTwo.setAttribute("id", "vertical-line-two")
            verticalLineTwo.setAttribute("class", "ver-ruler-line")
            document.body.appendChild(verticalLineTwo);

            const horizontalLineOne = document.createElement("span");
            horizontalLineOne.style.width = '100vw';
            horizontalLineOne.style.height = '1px';
            horizontalLineOne.style.backgroundColor = 'black';
            horizontalLineOne.style.zIndex = '9999';
            horizontalLineOne.style.position = 'fixed';
            horizontalLineOne.style.top = '40%';
            horizontalLineOne.style.left = '0';
            horizontalLineOne.style.cursor = 'move';
            horizontalLineOne.setAttribute("id", "horizontal-line-one")
            horizontalLineOne.setAttribute("class", "hor-ruler-line")
            document.body.appendChild(horizontalLineOne);

            const horizontalLineTwo = document.createElement("span");
            horizontalLineTwo.style.width = '100vw';
            horizontalLineTwo.style.height = '1px';
            horizontalLineTwo.style.backgroundColor = 'black';
            horizontalLineTwo.style.zIndex = '9999';
            horizontalLineTwo.style.position = 'fixed';
            horizontalLineTwo.style.top = '60%';
            horizontalLineTwo.style.left = '0';
            horizontalLineTwo.style.cursor = 'move';
            horizontalLineTwo.setAttribute("id", "horizontal-line-two")
            horizontalLineTwo.setAttribute("class", "hor-ruler-line")
            document.body.appendChild(horizontalLineTwo);

            const showHeight = () => {
              const lines = document.querySelectorAll(".hor-ruler-line")
              let lineOneFromTop = lines[0].getBoundingClientRect().top.toFixed(0)
              let lineTwoFromTop = lines[1].getBoundingClientRect().top.toFixed(0)
              let height = Math.abs(lineOneFromTop - lineTwoFromTop)
              console.log(height);
            }

            const showWidth = () => {
              const lines = document.querySelectorAll(".ver-ruler-line")
              let lineOneFromLeft = lines[0].getBoundingClientRect().left.toFixed(0)
              let lineTwoFromLeft = lines[1].getBoundingClientRect().left.toFixed(0)
              let width = Math.abs(lineOneFromLeft - lineTwoFromLeft)
              console.log(width);
            }

            showHeight();
            showWidth();

          },
        }
      );
    });

  })
});