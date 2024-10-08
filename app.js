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
            console.log(tabs);
            const horizontalLine = document.createElement("span");
            horizontalLine.style.width = '100vw';
            horizontalLine.style.height = '1px';
            horizontalLine.style.backgroundColor = 'black';
            horizontalLine.style.zIndex = '9999';
            horizontalLine.style.position = 'fixed';
            horizontalLine.style.top = '50%';
            horizontalLine.style.left = '0';
            horizontalLine.style.cursor = 'none';
            horizontalLine.setAttribute("class", "horizontal-line")
            document.body.appendChild(horizontalLine);
            let isClicked = false;
            let mousePosition;

            function moveLine(e) {
              mousePosition = e.clientY;
              horizontalLine.style.top = `${mousePosition - 15}px`;
            }

            horizontalLine.addEventListener("click", (e) => {
              isClicked = !isClicked;
              if (isClicked) {
                document.addEventListener('mousemove', moveLine);
                horizontalLine.style.cursor = 'none';
                console.log(isClicked);

              } else if (!isClicked) {
                document.removeEventListener("mousemove", moveLine);
                document.body.style.cursor = "default";
                console.log(isClicked);

              }
            })

            document.addEventListener('keydown', function (event) {
              if (event.key === 'Escape' || event.key === 'Esc') {
                const allHLines = document.querySelectorAll(".horizontal-line");
                const allLines = [...allHLines];
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
            document.body.innerHTML += `
                <span class="vertical-line">
                  <span style="width:1px; height:100vh; background-color:black;z-index:9999;position:absolute;top:0; left:50%"></span>
                </span>
        `;

            const verticalLine = document.querySelector(".vertical-line");
            // verticalLine.style.width = '1px';
            // verticalLine.style.height = '100vh';
            // verticalLine.style.backgroundColor = 'black';
            // verticalLine.style.zIndex = '9999';
            // verticalLine.style.position = 'fixed';
            // verticalLine.style.top = '0';
            // verticalLine.style.left = '50%';
            // verticalLine.style.cursor = 'none';
            // verticalLine.setAttribute("class", "vertical-line")
            // document.body.appendChild(verticalLine);
            let isClicked = false;
            let mousePosition;

            function moveLine(e) {
              mousePosition = e.clientX;
              verticalLine.style.left = `${mousePosition}px`;
            }

            verticalLine.addEventListener("click", (e) => {
              isClicked = !isClicked;
              if (isClicked) {
                document.addEventListener('mousemove', moveLine);
                verticalLine.style.cursor = 'none';
                console.log(isClicked);
              } else if (!isClicked) {
                document.removeEventListener("mousemove", moveLine);
                document.body.style.cursor = "default";
                console.log(isClicked);
              }
            })

            document.addEventListener('keydown', function (event) {
              if (event.key === 'Escape' || event.key === 'Esc') {
                const allVLines = document.querySelectorAll(".vertical-line");
                const allLines = [...allVLines];
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
            let higherHorLineFromTop
            let lefterVerLineFromLeft
            let isHorLineOneClicked = false;
            let isHorLineTwoClicked = false;
            let isVerLineOneClicked = false;
            let isVerLineTwoClicked = false;
            let mousePositionX;
            let mousePositionY;
            let height;
            let width;

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

            function showHeight() {
              let lineOneFromTop = horLines[0].getBoundingClientRect().top.toFixed(0)
              let lineTwoFromTop = horLines[1].getBoundingClientRect().top.toFixed(0)
              higherHorLineFromTop = lineOneFromTop > lineTwoFromTop ? lineOneFromTop : lineTwoFromTop
              height = Math.abs(lineOneFromTop - lineTwoFromTop)
            }

            function showWidth() {
              let lineOneFromLeft = verLines[0].getBoundingClientRect().left.toFixed(0)
              let lineTwoFromLeft = verLines[1].getBoundingClientRect().left.toFixed(0)
              lefterVerLineFromLeft = lineOneFromLeft > lineTwoFromLeft ? lineOneFromLeft : lineTwoFromLeft
              width = Math.abs(lineOneFromLeft - lineTwoFromLeft)
            }

            const heightIndicator = document.createElement("span")
            heightIndicator.style.position = "absolute"
            heightIndicator.style.bottom = "50px"
            heightIndicator.style.right = "50px"
            heightIndicator.style.backgroundColor = "white"
            document.body.appendChild(heightIndicator)

            const widthIndicator = document.createElement("span")
            widthIndicator.style.position = "absolute"
            widthIndicator.style.bottom = "50px"
            widthIndicator.style.right = "150px"
            widthIndicator.style.backgroundColor = "white"
            document.body.appendChild(widthIndicator)

            const horLines = document.querySelectorAll(".hor-ruler-line");
            const verLines = document.querySelectorAll(".ver-ruler-line");

            function moveLineOneY(e) {
              mousePositionY = e.clientY;
              e.currentTarget.getElementById('horizontal-line-one').style.top = `${mousePositionY}px`
              heightIndicator.innerText = "H: " + `${height}` + 'px'
            }

            function moveLineTwoY(e) {
              mousePositionY = e.clientY;
              e.currentTarget.getElementById('horizontal-line-two').style.top = `${mousePositionY}px`
              heightIndicator.innerText = "H: " + `${height}`
            }

            function moveLineOneX(e) {
              mousePositionX = e.clientX;
              e.currentTarget.getElementById('vertical-line-one').style.left = `${mousePositionX}px`;
              widthIndicator.innerText = "W: " + `${width}` + 'px'
            }

            function moveLineTwoX(e) {
              mousePositionX = e.clientX;
              e.currentTarget.getElementById('vertical-line-two').style.left = `${mousePositionX}px`;
              widthIndicator.innerText = "W: " + `${width}` + 'px'
            }


            horLines.forEach(line => {
              line.addEventListener("click", (e) => {
                if (e.currentTarget.id == 'horizontal-line-one') {
                  isHorLineOneClicked = !isHorLineOneClicked
                  if (isHorLineOneClicked) {
                    document.addEventListener('mousemove', moveLineOneY);
                    document.addEventListener('mousemove', showHeight);
                    showHeight();
                  } else {
                    document.removeEventListener("mousemove", moveLineOneY);
                    document.body.style.cursor = "default";
                  }
                } else if (e.currentTarget.id == 'horizontal-line-two') {
                  isHorLineTwoClicked = !isHorLineTwoClicked
                  if (isHorLineTwoClicked) {
                    document.addEventListener('mousemove', moveLineTwoY);
                    document.addEventListener('mousemove', showHeight);
                    showHeight();
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
                    document.addEventListener('mousemove', showWidth);
                    showWidth();
                  } else {
                    document.removeEventListener("mousemove", moveLineOneX);
                    document.body.style.cursor = "default";
                  }
                } else if (e.currentTarget.id == 'vertical-line-two') {
                  isVerLineTwoClicked = !isVerLineTwoClicked
                  if (isVerLineTwoClicked) {
                    document.addEventListener('mousemove', moveLineTwoX);
                    document.addEventListener('mousemove', showWidth);
                    showWidth();
                  } else {
                    document.removeEventListener("mousemove", moveLineTwoX);
                    document.body.style.cursor = "default";
                  }
                }
              })
            })


          },
        }
      );
    });
  })
});