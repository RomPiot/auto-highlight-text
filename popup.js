
const form = document.querySelector('form');

load(['patterns'])
  .then(data => data.patterns)
  .then(loadFormData);

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  await saveFormData();

  let currentTab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: {tabId: currentTab.id},
    files: ['content.js']
  });
});

form.addEventListener('input', debounce(saveFormData, 250));

/**
 * Populate the form with values from persistent storage.
 */
function loadFormData(patterns) {
  const inputs = form.querySelectorAll('input');
  const flatPatterns = patterns.flat();

  inputs.forEach((input, index) => {
    input.value = flatPatterns[index] || '';
  });
}

/**
 * Write the form values to persistent storage.
 */
function saveFormData() {
  const inputs = form.querySelectorAll('.form--input');

  const patterns = [...inputs].reduce((acc, input, index) => {

    acc.push(input.value);

    return acc;
  }, []);

  return save({patterns});
}

/**
 * Limits how often the supplied callback function will be called.
 *
 * @see https://developers.google.com/web/fundamentals/performance/rendering/debounce-your-input-handlers
 *
 * @param {function} fn Callback function that you want to debounce.
 * @param {number} wait The amount of time to wait before calling the function.
 */
function debounce(fn, wait = 100) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      fn.apply(this, args);
    }, wait);
  }
}

/**
 * Fetch the currently active tab.
 *
 * @returns chrome.tabs.Tab instance
 */
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}


/**
 * Minimal promise wrapper for chrome.storage.sync.set().
 *
 * @param {object} data Object containing key-value pairs of data to persist.
 */
async function save(data) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(data, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * Minimal promise wrapper for chrome.storage.sync.get().
 *
 * @param {string[]} keys  Array of keys to retrieve from storage.
 */
function load(keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(keys, (data) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(data);
      }
    });
  });
}
