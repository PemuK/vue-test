<template>
  <div class="modal" v-if="props.showModal">
    <div class="modal-content">
      <div class="modal-header">
        <span id="login-logo">Leaves</span>  
        <span class="close" @click="closeModal">&times;</span>
        <hr class="modal-hr">
      </div>
      <InputField v-for="(input, index) in inputs" :key="index" :img="input.img" :type="input.type" :autocomplete="input.autocomplete" :defaultValue="input.defaultValue"  @login-input="(value) => updateInputValue(input.model, value)" />
      <br><br>
      <button class="button" @click="login">登录</button><br>
      <a href="#">忘记密码？</a>
    </div>
  </div> 
</template>

<script setup lang="ts">
import InputField from './InputField.vue';
import { LoginInfo } from '@/types/login';
import { ref, defineProps, defineEmits } from 'vue';
import { loginApi } from '../api/index';
import router from '../router/index';
import { userStore } from '../stores/user';
// eslint-disable-next-line vue/valid-define-emits
const emit = defineEmits();
const store=userStore();
const inputs = ref([
  { img: require("../static/user.png"), type: "text", autocomplete: "off", model: "userName",defaultValue:"输入用户名" },
  { img: require("../static/password.png"), type: "password", autocomplete: "off", model: "password",defaultValue:"输入密码" }
]);

const userVerify:LoginInfo = ref({
  userName: '',
  password: ''
});

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  }
});

const closeModal = () => {
  emit('close-modal');
};

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
.modal-content {
  position: relative;
  margin:0 auto;
  margin-top: 7%;
  height: 340px;
  width: 350px;
  background-color: rgba(92, 89, 89, 0.415);
}

.close {
  position: relative;
  bottom: -5%;
  left:33%;
  font-size: 2rem;
  color:rgb(221, 221, 221);
  cursor:pointer;
}

.close:active {
  color:rgb(145, 145, 145);
}

.modal-hr {
  border-color: rgba(255, 255, 255, 0.356);
  margin-bottom: 20px;
}

.modal-header {
  background-color:rgb(50, 48, 48) ;
}

#login-logo {
  position: relative;
  margin-left: 20px;
  font-weight: 600;
}

button {
  border: none;
  outline: none;
  background: none;
  padding: 0;
  margin: 0;
  width: 90%;
  height: 15%;
  border-radius:2rem ;
  background-color:rgb(145, 145, 145);
  font-size: 1rem;
}

button:active {
  background-color:rgb(78, 76, 76);
}

a {
  color:rgb(145, 145, 145);
  font-size: 0.8rem;
  text-decoration: none;
}

a:active {
  color:rgb(78, 76, 76);
  font-size: 0.8rem;
}
</style>
