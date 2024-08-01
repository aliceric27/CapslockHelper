chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get(['position', 'capsOnText', 'capsOffText', 'showAtTarget'], function(items) {
    let updatedSettings = {
      position: items.position || 'top-right',
      capsOnText: items.capsOnText || '大寫模式：開啟',
      capsOffText: items.capsOffText || '大寫模式：關閉',
      showAtTarget: items.showAtTarget || false
    };
    chrome.storage.sync.set(updatedSettings, function() {
      console.log("預設設置已初始化或更新");
    });
  });
});