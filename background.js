chrome.commands.onCommand.addListener((command, tab) => {
  if (command == 'highlight-text') {
    hightlightText(tab.id);
  }
});

function hightlightText(tabId) {
  chrome.scripting.executeScript({
    target: {tabId},
    files: ['content.js'],
  });
}
