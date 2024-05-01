<template>
  <div v-if="email">
     <p>我们已向你的邮箱{{ email }}发送了验证码，请查收！</p>
     <InputField :img="input.img" :type="input.type" :autocomplete="input.autocomplete" :defaultValue="input.defaultValue" @login-input="(value) => updateInputValue(input.model, value)" />
    <button class="button" @click="verfiy">验证</button><br>
  </div>
    <p v-else> 抱歉！我们发生了错误。</p>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {verfiyStore} from '../stores/user'; // 修正拼写
import InputField from './InputField.vue';
import { verfiyApi } from '@/api';
const input = ref(
  { img: require("../static/user.png"), type: "text", autocomplete: "off", model: "verfiyCode",defaultValue:"输入验证码" },
);

const store =verfiyStore(); // 创建一个新的 store 实例
const email = ref(store.getEmail());
const verfiyCode=ref('');
const router=useRouter();

const updateInputValue = (model, value) => {
  verfiyCode.value = value;
};
const verfiy = async () => {
    try {
        const response = await verfiyApi(email.value,verfiyCode.value);
        if (response.data.data === "verfiy success") {
            router.push('/verfiy/success');
        } else {
            console.error("register failed");
        }
    } catch (error) {
        console.error(error);
    }
};

</script>
<style scoped>

p{
  margin-top:80px;
  border:none;
}
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
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  position: relative;
  margin: 0 auto;
  margin-top: 5%;
  width: 400px;
  height: 50px;
  border-radius: 0rem;
}
</style>