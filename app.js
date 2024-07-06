document.addEventListener("DOMContentLoaded", e => {
  const addHORLineBtn = document.getElementById("addHLine");
  const addVERLineBtn = document.getElementById("addVLine");
  const deleteLinesBtn = document.getElementById("deleteLines");
  const addRulerBtn = document.getElementById("addRuler");

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
              horizontalLine.style.top = `${mousePosition}px`;
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

            document.addEventListener('keydown', function (event) {
              if (event.key === 'Escape' || event.key === 'Esc') {
                const allHLines = document.querySelectorAll(".horizontal-line");
                const allVLines = document.querySelectorAll(".vertical-line");
                const allLines = [...allHLines, ...allVLines];
                allLines.forEach(element => {
                  element.remove();
                });
              }
            });
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
            function createLine(type, id, position, className) {
              const line = document.createElement("span");
              line.style.backgroundColor = 'black';
              line.style.zIndex = '9999';
              line.style.position = 'fixed';
              line.style.cursor = 'move';
              line.setAttribute("id", id);
              line.setAttribute("class", className);

              if (type === 'vertical') {
                line.style.width = '1px';
                line.style.height = '100vh';
                line.style.top = '0';
                line.style.left = position;
              } else if (type === 'horizontal') {
                line.style.width = '100vw';
                line.style.height = '1px';
                line.style.top = position;
                line.style.left = '0';
              }

              document.body.appendChild(line);
            }

            createLine('vertical', 'vertical-line-one', '40%', 'ver-ruler-line');
            createLine('vertical', 'vertical-line-two', '60%', 'ver-ruler-line');
            createLine('horizontal', 'horizontal-line-one', '40%', 'hor-ruler-line');
            createLine('horizontal', 'horizontal-line-two', '60%', 'hor-ruler-line');

            let isHorLineOneClicked = false;
            let isHorLineTwoClicked = false;
            let isVerLineOneClicked = false;
            let isVerLineTwoClicked = false;
            let mousePositionX;
            let mousePositionY;
            const horLines = document.querySelectorAll(".hor-ruler-line");
            const verLines = document.querySelectorAll(".ver-ruler-line");

            function moveLineOneY(e) {
              mousePositionY = e.clientY;
              e.currentTarget.getElementById('horizontal-line-one').style.top = `${mousePositionY}px`
            }

            function moveLineTwoY(e) {
              mousePositionY = e.clientY;
              e.currentTarget.getElementById('horizontal-line-two').style.top = `${mousePositionY}px`
            }

            function moveLineOneX(e) {
              mousePositionX = e.clientX;
              e.currentTarget.getElementById('vertical-line-one').style.left = `${mousePositionX}px`;
            }

            function moveLineTwoX(e) {
              mousePositionX = e.clientX;
              e.currentTarget.getElementById('vertical-line-two').style.left = `${mousePositionX}px`;
            }


            horLines.forEach(line => {
              line.addEventListener("click", (e) => {
                if (e.currentTarget.id == 'horizontal-line-one') {
                  isHorLineOneClicked = !isHorLineOneClicked
                  if (isHorLineOneClicked) {
                    document.addEventListener('mousemove', moveLineOneY);
                  } else {
                    document.removeEventListener("mousemove", moveLineOneY);
                    document.body.style.cursor = "default";
                  }
                } else if (e.currentTarget.id == 'horizontal-line-two') {
                  isHorLineTwoClicked = !isHorLineTwoClicked
                  if (isHorLineTwoClicked) {
                    document.addEventListener('mousemove', moveLineTwoY);
                  } else {
                    document.removeEventListener("mousemove", moveLineTwoY);
                    document.body.style.cursor = "default";
                  }
                }
              })
            })

            verLines.forEach(line => {
              line.addEventListener("click", (e) => {
                if (e.currentTarget.id == 'vertical-line-one') {
                  isVerLineOneClicked = !isVerLineOneClicked
                  if (isVerLineOneClicked) {
                    document.addEventListener('mousemove', moveLineOneX);
                  } else {
                    document.removeEventListener("mousemove", moveLineOneX);
                    document.body.style.cursor = "default";
                  }
                } else if (e.currentTarget.id == 'vertical-line-two') {
                  isVerLineTwoClicked = !isVerLineTwoClicked
                  if (isVerLineTwoClicked) {
                    document.addEventListener('mousemove', moveLineTwoX);
                  } else {
                    document.removeEventListener("mousemove", moveLineTwoX);
                    document.body.style.cursor = "default";
                  }
                }
              })
            })

            function showHeight() {
              let lineOneFromTop = horLines[0].getBoundingClientRect().top.toFixed(0)
              let lineTwoFromTop = horLines[1].getBoundingClientRect().top.toFixed(0)
              let height = Math.abs(lineOneFromTop - lineTwoFromTop)
              const heightIndicator = document.createElement("span")
              // heightIndicator.style.top = 
              console.log(height);
            }

            function showWidth() {
              let lineOneFromLeft = verLines[0].getBoundingClientRect().left.toFixed(0)
              let lineTwoFromLeft = verLines[1].getBoundingClientRect().left.toFixed(0)
              let width = Math.abs(lineOneFromLeft - lineTwoFromLeft)
              const widthIndicator = document.createElement("span")
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