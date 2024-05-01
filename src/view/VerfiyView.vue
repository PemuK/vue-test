<template>
  <div id="container">
    <div id="img-log">
      <img src="../static/verfiy.png" />
    </div>
    <transition name="fade" mode="out-in">
      <div class="input" v-if="!coded">
        <div id="logo">
          <img src="../static/logo.png" width="100" />
          <h1>Leaves</h1>
        </div>
        <div class="button-container">
          <div :class="{ 'button': true, 'left': true, 'active': !show }" @click="change('register')">注册</div>
          <div :class="{ 'button': true, 'right': true, 'active': show }" @click="change('login')">登录</div>
        </div>
        <div class="modal">
          <transition name="fade" mode="out-in">
            <verfiy-modal v-if="show"></verfiy-modal>
            <register-modal @registerSuccess="verfiyCode" v-else></register-modal>
          </transition>
        </div>
      </div>
      <VerfiyCode v-else class="input"></VerfiyCode>
    </transition>
  </div>
</template>

<script setup>
import RegisterModal from "../components/RegisterModal.vue";
import VerfiyModal from "../components/VerfiyModal.vue";
import VerfiyCode from "@/components/VerfiyCode.vue";
import { ref } from 'vue';

const show = ref(false);
const coded = ref(false);

const change = (modal) => {
  if (modal === 'register') {
    show.value = false;
  } else {
    show.value = true;
  }
};

const verfiyCode = (data) => {
  console.log(data.code);
  if (data.code === 200) {
    coded.value = true;
  }
};
</script>
  
  <style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px; /* 调整按钮上边距 */
}

.button {
  border: none;
  outline: none;
  background: none;
  font-size: 1.2rem;
  font-weight: 600;
  color: aliceblue;
  cursor: pointer;
  text-align: center;
  width: 100px;
}

.button.left {
  width: 50%;
}

.button.right {
  
  width: 50%;
}
.button:active {
  border: none;
  outline: none;
  background: none;
  font-size: 1.2rem;
  font-weight: 600;
  color: rgb(176, 176, 176);
  cursor: pointer;
}
.active{
  color: rgb(176, 176, 176);
}
  .left-right{
    width: 100px;
    height: 100px;
    background-color:aqua;
    
  }
  #container {
    display: flex; /* 使用 Flex 布局 */

  }
  
  #img-log {
    position: relative;
    text-align: left;
    margin-top:40px;
    margin-left: 200px;
    width: 50%;
  }
  
  .input {
    width: 500px;
  }
  #logo{
    margin-left: 65px;
    margin-top:130px ;
    display: flex;
    align-items: center; /* 垂直居中 */
  }
  h1{
    margin-left: 3%;
    font-size: 4rem;
  }
  /* 在小屏幕上应用不同的样式 */
  @media screen and (max-width: 768px) {
    #container {
      flex-direction: column; /* 手机端时，垂直排列 */
    }
  
    #img-log {
      margin-left: 20%; /* 重置左边距 */
      width: 80%; /* 图片宽度占满整个宽度 */
    }
    #img-log img {
      width: 80%; 
      max-width: 600px; 
      height: auto;
    }
    .input {
      width: 100%; 
    }
    #logo {
    display: none;
  }
  }
  
/* 控制图片在电脑端的大小 */
@media screen and (min-width: 769px) {
  #img-log img {
    width: 120%; 
    max-width: 600px;
    height: auto; 
  }
  .input {
    margin-top: 2%; /* 注意这里是 margin-top 而不是 magrin top */
  }

}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
  </style>
  