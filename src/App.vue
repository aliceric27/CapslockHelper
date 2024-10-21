
<template>
  <div class="container">
    <img id="logo" src="./assets/CapsLookLogo.webp" alt="capsLookLogo" />
      <img id="link-btn" src="./assets/CapsLooklink-btn.webp" alt="link-btn" @click="outLink"/>
    <div class="block">
    <div v-if="!showAtTarget" id="globalSettings">
      <h4>顯示位置</h4>
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
  </div>
  <div class="block">
    <h4>提示文字</h4>
    <div>
      大寫開啟時
      <input class="capsText" v-model="capsOnText">
    </div>
    <div>
      大寫關閉時
      <input class="capsText" v-model="capsOffText">
    </div>
  </div>
    <button @click="saveSettings" class="save-btn">保存</button>
    <div v-if="saveStatus" class="save-status">
      設置已保存!
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

const outLink = ()=>{
  try {
      chrome.tabs.create({
        url: 'https://chromewebstore.google.com/detail/caps-lock-%E7%8B%80%E6%85%8B%E6%8C%87%E7%A4%BA%E5%99%A8/fpnlpmkinohjlmefoljkoadjbnphdgag'
      });
    } catch (error) {
      console.error('Failed to open new tab:', error);
    }
}

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
/*
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
*/

/*
* {
    border: solid #bbb 1px;
}
*/

#logo{
  width:126px;
  margin-right: 142px;
}
#link-btn{
  width:25px;
  padding: 0 0 2% 0;
  cursor: pointer;
}
.block{
  width: 300px;
  border: solid #eee 1px;
  box-shadow: 0px 1px 3px #eee;
  border-radius: 12px;
  background-color: #FBFBFB;
  padding: 0 12px;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
h2 {
    color: #0BC65F;
    font-size: 24px;
    text-align: left;
    line-height:50%;
}
h4{
  color: #484848;
  font-size: 16px;
  line-height:25%;
}
.container {
  background-color: #ffffff;
  width: 300px;
  padding: 10px;
}
div {
  margin: 4% 0;
  font-size: 14px;
  color:#878787;
}
.position {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-width: 168px;
    gap: 8px;
}
.box {
    border-radius: 10px;
    width: 48px;
    border: solid #ddd 1px;
    background-color: #fff;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0px 3px 0px #ddd;
}
.box:hover {
  background-color: #eee;
}
.box:active {
  border: solid #299252 1px;
  background-color: #299252;
  box-shadow: 0px 2px 0px #299252;
}
.isBoxSelected {
  border: solid #0BC65F 1px;
  background-color: #0BC65F;
  box-shadow: 0px 2px 0px #299252;
}
.isBoxSelected:hover {
  border: solid #0BC65F 1px;
  background-color: #0BC65F;
  box-shadow: 0px 2px 0px #299252;
}
input, select {
  margin: 1% 0;
  padding: 1%;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
}
.capsText{
  width: 160px;
  margin-left: 25px;
}
.save-status {
  color: #299252;
  font-size: 16px;
  /*margin-top: 10px;*/
  display: inline-block;
  line-height:0%;
  margin-left: 16px;
}
.save-btn {
  cursor: pointer;
  width: 80px;
  height: 42px;
  font-size: 16px;
  padding: 2% 5%;
  background-color: #0BC65F;
  color: #ffffff;
  border: 0;
  border-radius: 10px;
  box-shadow: 0px 2px 0px #299252;
}
.save-btn:hover {
  background-color: #00af46;
}
</style>