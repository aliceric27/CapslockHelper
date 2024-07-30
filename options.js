document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['position', 'capsOnText', 'capsOffText'], function(items) {
    document.getElementById('position').value = items.position || 'top-right';
    document.getElementById('capsOnText').value = items.capsOnText || '大寫模式: 開啟';
    document.getElementById('capsOffText').value = items.capsOffText || '大寫模式: 關閉';
  });

  document.getElementById('save').addEventListener('click', function() {
    let position = document.getElementById('position').value;
    let capsOnText = document.getElementById('capsOnText').value;
    let capsOffText = document.getElementById('capsOffText').value;

    chrome.storage.sync.set({
      position: position,
      capsOnText: capsOnText,
      capsOffText: capsOffText
    }, function() {
      alert('設置已保存');
    });
  });
});