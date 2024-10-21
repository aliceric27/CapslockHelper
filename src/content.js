let indicator;
let targetIndicator;
let settings = {
  position: 'top-right',
  capsOnText: '大寫模式：開啟',
  capsOffText: '大寫模式：關閉',
  showAtTarget: true
};

function createIndicator() {
  indicator = document.createElement('div');
  setCommonStyles(indicator);
  indicator.style.position = 'fixed';
  document.body.appendChild(indicator);
}

function createTargetIndicator() {
  targetIndicator = document.createElement('div');
  setCommonStyles(targetIndicator);
  targetIndicator.style.position = 'absolute';
  targetIndicator.style.fontSize = '12px';
  targetIndicator.style.whiteSpace = 'nowrap';
  document.body.appendChild(targetIndicator);
}

function setCommonStyles(element) {
  element.style.padding = '2px 5px';
  element.style.background = 'rgba(0,0,0,0.7)';
  element.style.color = 'white';
  element.style.borderRadius = '3px';
  element.style.zIndex = '2147483647';
  element.style.display = 'none';
  element.style.pointerEvents = 'none';
  element.style.width = 'max-content';
}

function initposition () {
  indicator.style.top='';
   indicator.style.bottom='';
   indicator.style.right='';
   indicator.style.left='';
}

function updateIndicatorPosition() {
  switch(settings.position) {
    case 'top-left':
      indicator.style.top = '10px';
      indicator.style.left = '10px';
      break;
    case 'top-right':
      indicator.style.top = '10px';
      indicator.style.right = '10px';
      break;
    case 'bottom-left':
      indicator.style.bottom = '10px';
      indicator.style.left = '10px';
      break;
    case 'bottom-right':
      indicator.style.bottom = '10px';
      indicator.style.right = '10px';
      break;
    case 'center-top':
      indicator.style.top = '0px';
      indicator.style.left = '50vw';
      break;
    case 'left-mid':
      indicator.style.top = '50vh';
      indicator.style.left = '0px';
      break;
    case 'center-mid':
      indicator.style.top = '50vh';
      indicator.style.left = '50vw';
      break;
    case 'center-right':
      indicator.style.top = '50vh';
      indicator.style.right = '0px';
      break;
    case 'center-bottom':
      indicator.style.bottom = '0';
      indicator.style.left = '50vw';
      break;
  }
}

function showIndicator(capsLockOn) {
  const text = capsLockOn ? settings.capsOnText : settings.capsOffText;
  if (settings.showAtTarget) {
    showTargetIndicator(text);
  } else {
    indicator.textContent = text;
    indicator.style.display = 'block';
    clearTimeout(indicator.timeoutId);
    indicator.timeoutId = setTimeout(() => {
      indicator.style.display = 'none';
    }, 1500);
  }
}

function showTargetIndicator(text) {
  let activeElement = document.activeElement;
  if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
    let rect = activeElement.getBoundingClientRect();
    
    targetIndicator.textContent = text;
    targetIndicator.style.display = 'block';
    
    let top = rect.bottom + window.scrollY;
    let left = rect.left + window.scrollX;

    targetIndicator.style.top = `${top}px`;
    targetIndicator.style.left = `${left}px`;

    clearTimeout(targetIndicator.timeoutId);
    targetIndicator.timeoutId = setTimeout(() => {
      targetIndicator.style.display = 'none';
    }, 1500);
  }
}

function checkCapsLock(event) {
  if (event.getModifierState && event.key === 'CapsLock') {
    const capsLockOn = event.getModifierState('CapsLock');
    showIndicator(capsLockOn);
  }
}

function initializeExtension() {
  if (!indicator) {
    createIndicator();
  }
  if (!targetIndicator) {
    createTargetIndicator();
  }
  updateIndicators();
  document.addEventListener('keydown', checkCapsLock);
}

const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      for (let node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
            node.addEventListener('keydown', checkCapsLock);
          }
        }
      }
    }
  }
});

function updateIndicators() {
  initposition();
  if (indicator) {
    setCommonStyles(indicator);
    updateIndicatorPosition();
  }
  if (targetIndicator) {
    setCommonStyles(targetIndicator);
    targetIndicator.style.position = 'absolute';
    targetIndicator.style.fontSize = '12px';
    targetIndicator.style.whiteSpace = 'nowrap';
  }
}


chrome.storage.sync.get(['position', 'capsOnText', 'capsOffText', 'showAtTarget'], function(result) {
  settings = {...settings, ...result};
  initializeExtension();
  observer.observe(document.body, { childList: true, subtree: true });
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (let key in changes) {
    settings[key] = changes[key].newValue;
  }
  console.log('changed1')
  updateIndicators();
});
