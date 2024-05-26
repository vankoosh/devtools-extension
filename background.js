chrome.action.onClicked.addListener((tab) => {
  // Inject content script into the current page
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['contentScript.js']
  });
});
