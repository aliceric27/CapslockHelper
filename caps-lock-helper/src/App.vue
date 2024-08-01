<template>
  <div class="container">
    <h2>Caps Lock 狀態指示器設置</h2>
    <div v-if="!showAtTarget" id="globalSettings">
      顯示位置：
      <select v-model="position">
        <option value="top-left">左上</option>
        <option value="top-right">右上</option>
        <option value="bottom-left">左下</option>
        <option value="bottom-right">右下</option>
      </select>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="showAtTarget"> 顯示於目標處
      </label>
    </div>
    <div>
      大寫開啟時的提示文字：
      <input v-model="capsOnText">
    </div>
    <div>
      大寫關閉時的提示文字：
      <input v-model="capsOffText">
    </div>
    <button @click="saveSettings">保存</button>
    <div v-if="saveStatus" class="save-status">{{ saveStatus }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const position = ref('top-right');
const capsOnText = ref('大寫模式：開啟');
const capsOffText = ref('大寫模式：關閉');
const showAtTarget = ref(false);
const saveStatus = ref('');

onMounted(() => {
  chrome.storage.sync.get(['position', 'capsOnText', 'capsOffText', 'showAtTarget'], (items) => {
    position.value = items.position || 'top-right';
    capsOnText.value = items.capsOnText || '大寫模式：開啟';
    capsOffText.value = items.capsOffText || '大寫模式：關閉';
    showAtTarget.value = items.showAtTarget || false;
  });
});

const saveSettings = () => {
  chrome.storage.sync.set({
    position: position.value,
    capsOnText: capsOnText.value,
    capsOffText: capsOffText.value,
    showAtTarget: showAtTarget.value
  }, () => {
    saveStatus.value = '設置已保存';
    setTimeout(() => {
      saveStatus.value = '';
    }, 1500);
  });
};
</script>

<style scoped>
.container {
  width: 300px;
  padding: 20px;
}
.save-status {
  color: green;
  margin-top: 10px;
}
</style>