let responseElement;

document.addEventListener("DOMContentLoaded", function () {
  const btnAction = document.getElementById("clickBtn");
  const style = document.createElement('style');
  style.type = 'text/css';

  const horizontalLineCss =

    btnAction.addEventListener("click", () => {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        const tabId = tabs[0].id;

        chrome.scripting.executeScript(
          {
            target: { tabId: tabId },
            function: () => {
              const line = document.createElement("span");
              line.setAttribute("class", "horizontal-line");
              document.body.appendChild(line);
              console.log("tabId");
            },
          }
        );
      });
    });
});