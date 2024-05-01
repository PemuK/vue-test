<template>
  <div> 
    <div class="header" >
      <div class="left-section" @click="toHome">
        <img src="../static/logo.png" width="40">
        <h1 id="text-home">Leaves</h1>
      </div>
    </div>
    <div v-if="isLoggedIn==='true'" class="navbar" >
      <router-link to=""  @click="logout()" class="nav-link">登出</router-link>
    </div>
    <div v-if="isLoggedIn==='false'||isLoggedIn===null" class="navbar">
      <router-link to="" class="nav-link" @click="showModal = true">登录</router-link>
      <router-link to="/verfiy" class="nav-link">注册</router-link>
    </div>
    <img src="../static/verfiy.png" width="500" id="index-logo">

    <p >网络报修系统</p><br>
    <p>Integrate Network Maintenance System</p>
    <router-view></router-view>
    <div class="modal-overlay" v-if="showModal"></div>
    <login-modal :show-modal="showModal" @close-modal="handleModalClose"></login-modal>
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
import { ref, watchEffect } from 'vue';
import LoginModal from '../components/LoginModal.vue';
import { userStore } from '@/stores/user';
import { useRouter } from 'vue-router'; // 修改这里
const store = userStore();
const isLoggedIn = ref(false);
isLoggedIn.value=localStorage.getItem('isLoggedIn');
console.log(isLoggedIn.value)
const showModal = ref(false);
const router = useRouter(); 
const snackbar = ref(false);
const snackbarText = ref('');
const snackbarTimeout = ref(6000); // Snackbar display time in milliseconds
const snackbarColor = ref('success'); // Snackbar color, you can change it as needed


watchEffect(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn');
})

const toHome = () => {
  snackbarText.value = '登录成功！';
  snackbarColor.value = 'success';
  snackbar.value = true;
  store.logout();
  setTimeout(() => { 
     router.push('/home'); 
    }, 2000); // Adjust the delay as needed

}

const handleModalClose = () => {
  showModal.value = false;
}

const logout = () => {
  snackbarText.value = '登出成功！';
  snackbarColor.value = 'success';
  snackbar.value = true;
  store.logout();
  setTimeout(() => {
      window.location.reload();
    }, 2000); // Adjust the delay as needed
}
</script>

<style scoped>
img{
  margin-right: 10px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #16181a;
  margin-top: -60px;
  margin-left: -20px;
  width: 1000%; /* Set header width to 100% */
  height:80px;
  padding: 0 20px; /* Optional: Add padding to the header */
  cursor: pointer;
}
.left-section {
  display: flex;
  align-items: center;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色 */
  transform: 1s;
  z-index: 20; /* 确保在模态框之上 */
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 21; /* 确保在遮罩层之上 */
}
  #text-home {
    color: rgb(156, 157, 159);
    position: relative;
    margin-right: 55%;
    caret-color: transparent; 
  }
  .navbar {
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    margin-top: -50px;
    margin-right: 20px;
    caret-color: transparent; 
  }
  
  .nav-link {
    margin-left: 10px;
    font-size: large;
    color: rgb(183, 183, 183);
    text-decoration: none;
    caret-color: transparent; 
  }
  .nav-link:active {
    margin-left: 10px;
    font-size: large;
    color: rgb(107, 107, 107);
    text-decoration: none;
    caret-color: transparent; 
  }
  img{
    position: float;
  }
  #index-logo{
    margin-left:90px;
  }
  p{
    margin-right:10px ;
    color:rgb(162, 162, 162);
  }

  
@media screen and (max-width: 768px) {
  #index-logo{
    margin-top:40px;
    width: 450px;
    margin-left: -3px;
  }
}
</style>