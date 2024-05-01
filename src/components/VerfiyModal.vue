<template>
    <div>
      <InputField v-for="(input, index) in inputs" :key="index" :img="input.img" :type="input.type" :autocomplete="input.autocomplete" :defaultValue="input.defaultValue"  @login-input="(value) => updateInputValue(input.model, value)" />
      <button class="button" @click="login">登录</button><br>
    </div>
    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      :color="snackbarColor"
      top
    >
      {{ snackbarText }}
    </v-snackbar>
</template>

<script setup>
import InputField from './InputField.vue';
import { ref } from 'vue';
import { loginApi } from '../api/index';
import router from '../router/index';
import { userStore } from '../stores/user';
const inputs = ref([
  { img: require("../static/user1.png"), type: "text", autocomplete: "off", model: "userName",defaultValue:"输入用户名" },
  { img: require("../static/password1.png"), type: "password", autocomplete: "off", model: "password",defaultValue:"输入密码" },
]);

const snackbar = ref(false);
const snackbarText = ref('');
const snackbarTimeout = ref(6000); // Snackbar display time in milliseconds
const snackbarColor = ref('success'); // Snackbar color, you can change it as needed
// eslint-disable-next-line vue/valid-define-emits
const store=userStore();
const userVerify = ref({
  userName: '',
  password: '',
  gid:''
});

const updateInputValue = (model, value) => {
  userVerify.value[model] = value;
};

const login = async () => {
  try {
    const response = await loginApi(userVerify.value);
    console.log(response.data.code);
    if (response.data.code === 200) {
      // console.log(response)
      store.saveUserLogIn(response.data.data.id,response.data.data.userName,response.data.data.gid);
      snackbarText.value = '登录成功！';
    snackbarColor.value = 'success';
    snackbar.value = true;
      setTimeout(() => {
      router.push("/home");
    }, 2000); // Adjust the delay as needed
        
    } else {
      console.error("Login failed");
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
  color:aliceblue;
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
  -webkit-box-shadow: 0 0 0 1000px rgb(115, 50, 50) inset;
}
</style>



