<template>
    <div>
        <InputField v-for="(input, index) in inputs" :key="index" :img="input.img" :type="input.type" :autocomplete="input.autocomplete" :defaultValue="input.defaultValue" @login-input="(value) => updateInputValue(input.model, value)" />
        <button class="button" @click="register">注册</button><br>
    </div>
</template>

<script setup>
import InputField from './InputField.vue';
import { ref, defineEmits } from 'vue';
import { registerApi } from '../api';
import {verfiyStore} from '../stores/user'; // 修正拼写
const emit = defineEmits(['registerSuccess']);
const store =verfiyStore(); // 创建一个新的 store 实例

const registerInfo = ref({
    userName: '',
    password: '',
    confirmPassword: '', // 修正拼写
    email: ''
});

const inputs = ref([
    { img: require("../static/user1.png"), type: "text", autocomplete: "off", model: "userName",defaultValue:"输入用户名"},
    { img: require("../static/password1.png"), type: "password", autocomplete: "off", model: "password",defaultValue:"输入密码"},
    { img: require("../static/password1.png"), type: "password", autocomplete: "off", model: "confirmPassword",defaultValue:"输入确认密码" }, 
    { img: require("../static/email.png"), type: "email", autocomplete: "off", model: "email",defaultValue:"输入邮箱" }
]);

const updateInputValue = (model, value) => {
    registerInfo.value[model] = value;
};

const register = async () => {
    try {
        const response = await registerApi(registerInfo.value);
        if (response.data.data === "Verification code sent successfully.") {
            store.saveEmail(registerInfo.value.email); // 修正参数
            emit("registerSuccess", response.data);
        } else {
            console.error("register failed");
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<style scoped>
button {
  border: none;
  outline: none;
  background: none;
  padding: 0;
  margin: 0;
  width: 90%;
  height: 50px;
  margin-top: 30px;
  color:rgb(0, 0, 0);
  background-color:rgb(145, 145, 145);
  font-size: 1rem;
}

button:active {
  background-color:rgb(78, 76, 76);
}

.input {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  position: relative;
  margin: 0 auto;
  margin-top: 5%;
  width: 90%;
  height: 50px;
  border-radius: 0rem;
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
  color:white;
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
  -webkit-box-shadow: 0 0 0 1000px rgb(115, 50, 50) inset;
}
</style>



