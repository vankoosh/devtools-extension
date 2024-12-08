const addRulerBtn = document.querySelector(".add-ruler-button");

function addRulerCallback() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const tabId = tabs[0].id;
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        function: () => {
          const body = document.querySelector("body");
          console.log(body);
        },
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  addRulerBtn.addEventListener("click", e => {
    addRulerCallback()
  });
});