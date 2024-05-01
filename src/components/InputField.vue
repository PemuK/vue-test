<template>
  <div class="input">
    <img :src="props.img" width="20">
    <input :type="props.type" :autocomplete="props.autocomplete" @input="updateInputValue($event.target.value)" :placeholder="props.defaultValue"/>
  </div>
</template>

<script setup>
import { defineProps,defineEmits } from 'vue';

const props = defineProps({
  img: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  defaultValue:{
    type:String,
  }
});

const emit = defineEmits(); // eslint-disable-line vue/valid-define-emits

const updateInputValue = (value) => {
  emit("login-input", value); // Emit the "input" event with the new value
}
</script>


<style scoped>
.input {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  position: relative;
  margin: 0 auto;
  margin-top: 10%;
  width: 90%;
  height: 15%;
  border-radius: 2rem;
}

.input img {
  margin-left: -12%;
  margin-right: 2%;
}

.input input {
  border: none;
  outline: none;
  background: none;
  padding: 0;
  margin: 0;
  width: 70%; /* 让输入框占满父元素宽度 */
  height: 100%;
  color:aliceblue;
}

.input {
  border: 1px solid #b2b2b2; /* 添加边框样式 */
}

.input:focus-within {
  border: 1px solid #787777; /* 添加获取焦点时的边框样式 */
}

.input:hover {
  border: 1px solid #787777; /* 添加获取焦点时的边框样式 */
}

/* 移除自动填充的背景色和边框色 */
.input input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset;
}

/* 移除自动填充时的文本颜色 */
.input input:-webkit-autofill::first-line {
  color: inherit;
}
</style>
