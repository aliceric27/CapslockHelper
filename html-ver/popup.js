document.addEventListener('DOMContentLoaded', function() {
    // 載入當前設置
    chrome.storage.sync.get(['position', 'capsOnText', 'capsOffText', 'showAtTarget'], function(items) {
      document.getElementById('position').value = items.position || 'top-right';
      document.getElementById('capsOnText').value = items.capsOnText || '大寫模式：開啟';
      document.getElementById('capsOffText').value = items.capsOffText || '大寫模式：關閉';
      document.getElementById('showAtTarget').checked = items.showAtTarget || false;
      toggleGlobalSettings(items.showAtTarget || false);
    });
  
    // 切換全局設置的顯示
    document.getElementById('showAtTarget').addEventListener('change', function(e) {
      toggleGlobalSettings(e.target.checked);
    });
  
    // 保存按鈕點擊事件
    document.getElementById('save').addEventListener('click', function() {
      let position = document.getElementById('position').value;
      let capsOnText = document.getElementById('capsOnText').value;
      let capsOffText = document.getElementById('capsOffText').value;
      let showAtTarget = document.getElementById('showAtTarget').checked;
  
      chrome.storage.sync.set({
        position: position,
        capsOnText: capsOnText,
        capsOffText: capsOffText,
        showAtTarget: showAtTarget
      }, function() {
        // 顯示保存成功消息
        let status = document.createElement('div');
        status.textContent = '設置已保存';
        status.style.color = 'green';
        status.style.marginTop = '10px';
        document.body.appendChild(status);
        setTimeout(function() {
          status.remove();
        }, 1500);
      });
    });
  });
  
  function toggleGlobalSettings(show) {
    document.getElementById('globalSettings').style.display = show ? 'none' : 'block';
  }