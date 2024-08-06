
<template>
  <div class="container">
    <h2>Caps Lock 狀態指示器設置</h2>
    <div v-if="!showAtTarget" id="globalSettings">
      顯示位置：
      <div class="position">
        <div 
          v-for="(box, index) in boxList"
          :key="box"
          class="box"
          :class="{ isBoxSelected: index === selectedBoxIndex }"
          @click="clickBox(index)"
        >
        </div>
      </div>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="showAtTarget"> 顯示於指標處
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
    <button @click="saveSettings" class="save-btn">保存</button>
    <div v-if="saveStatus" class="save-status">
      設置已保存
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';

const position = ref('top-right');
const selectedBoxIndex = ref(null);
const capsOnText = ref('大寫模式：開啟');
const capsOffText = ref('大寫模式：關閉');
const showAtTarget = ref(false);
const saveStatus = ref(false);

const boxVal = {
  box1: "top-left",
  box2: "center-top",
  box3: "top-right",
  box4: "left-mid",
  box5: "center-mid",
  box6: "center-right",
  box7: "bottom-left",
  box8: "center-bottom",
  box9: "bottom-right",
};

const boxList = Array.from({length: 9}, (_, i) => `box${i + 1}`);

const clickBox = (i) => {
  selectedBoxIndex.value = i;
  position.value = boxVal[`box${i + 1}`] || position.value;
};

const saveSettings = () => {
  const settings = {
    position: position.value,
    capsOnText: capsOnText.value,
    capsOffText: capsOffText.value,
    showAtTarget: showAtTarget.value
  };

  if (chrome?.storage?.sync) {
    chrome.storage.sync.set(settings, () => {
      saveStatus.value = true;
      setTimeout(() => saveStatus.value = false, 3000);
    });
  } else {
    console.log('Settings saved (mock):', settings);
    saveStatus.value = true;
    setTimeout(() => saveStatus.value = false, 3000);
  }
};

onMounted(() => {
  if (chrome?.storage?.sync) {
    chrome.storage.sync.get(['position', 'capsOnText', 'capsOffText', 'showAtTarget'], (items) => {
      position.value = items.position || 'top-right';
      capsOnText.value = items.capsOnText || '大寫模式：開啟';
      capsOffText.value = items.capsOffText || '大寫模式：關閉';
      showAtTarget.value = items.showAtTarget || false;
      selectedBoxIndex.value = boxList.findIndex(box => boxVal[box] === position.value);
    });
  }
});

watch(selectedBoxIndex, (newIndex) => {
  if (newIndex !== null) {
    position.value = boxVal[`box${newIndex + 1}`] || position.value;
  }
});
</script>


<style scoped>
.container {
  background-color: #f4f4f4;
  width: 300px;
  padding: 20px;
}
div {
  margin: 3% 0;
}
.position {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 100px;
  gap: 2%;
}
.box {
  border-radius: 5px;
  background-color: rgb(137, 137, 137);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.box:hover, .isBoxSelected {
  background-color: rgb(202, 202, 202);
}
input, select {
  margin: 1% 0;
  padding: 1%;
  border: 1px solid #000;
  border-radius: 5px;
}
.save-status {
  color: green;
  margin-top: 10px;
}
.save-btn {
  cursor: pointer;
  padding: 2% 5%;
  background-color: #00af46;
  color: #ffffff;
  border: 0;
  border-radius: 5px;
}
.save-btn:hover {
  background-color: #008d39;
}
</style>