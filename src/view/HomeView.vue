<template>
    <div class="header">
      <div class="left-section">
        <img src="../static/logo.png" width="40">
        <h1 id="text-home">Leaves</h1>
      </div>
    </div>
    <div class="navbar" >
      <router-link to=""  @click="logout()" class="nav-link">登出</router-link>
    </div>
    <br><br> 
    <div v-if="gid==='1'||gid==='2'">
      <div id="hello-user"><h3>Hello! {{ userName }}</h3></div>
      <div class="select-function">
        <div :class="{ 'function-active': contentShow=='weihu','function-item':true}" @click="functionChange('weihu')">维护管理</div>
        <div :class="{ 'function-active': contentShow=='user','function-item':true}" v-if="gid==='2'" @click="functionChange('user')">用户管理</div>
      </div>
      <transition name="fade" mode="out-in">
      <div class="content" v-if="contentShow=='weihu'"><hr>
        <div class="content-header"><h1>weihu</h1></div><hr>
        <div class="button-container">
          <div :class="{ 'button': true, 'left': true, 'active': !show }" @click="change('unfinished')">未完成</div>
          <div class="repair-from-main">
        <RepairFrom :icon="false"></RepairFrom>
      </div>
          <div :class="{ 'button': true, 'right': true, 'active': show }" @click="change('finished')">已完成</div>
        </div>
        <transition name="fade" mode="out-in">
          <div v-if="!show">
            <div v-if="datas">
            <RepairCard v-for="(data,index) in datas" :key="index" :recordId="data.id" :userId="data.adder" :title="data.location" :subtitle="data.registerTime" :text="data.note" :clientName="data.clientName" :phoneNumber="data.phoneNumber" :isFinish="'no'" :gid="gid"></RepairCard>
            </div>
             <h2 v-else>暂无未完成维修</h2>
          </div>
          <div v-else>
            <RepairCard v-for="(data,index) in datass" :key="index" :recordId="data.id" :userId="data.adder" :title="data.location" :subtitle="data.finishTime" :text="data.note" :clientName="data.clientName" :phoneNumber="data.phoneNumber" :isFinish="'yes'" :gid="gid" :solution="data.solution" :reporter="data.reporter"></RepairCard>
          </div>
        </transition>
      </div>
      <div class="content" v-else>
        <!-- <hr> -->
        <!-- <div class="content-header"><h1>user</h1></div><hr> -->
        <div class="button-container">
          <!-- <div :class="{ 'button': true, 'left': true, 'active': !show }" @click="change('unfinished')">user</div> -->
          <!-- <div :class="{ 'button': true, 'right': true, 'active': show }" @click="change('finished')" ><s>maintianer</s></div> -->
        </div>
        <br>
        <transition name="fade" mode="out-in">
          <div v-if="!show">
           <user-info-item :userInfo="userInfo" :header="userHeader"></user-info-item>
          </div>
          <div v-else>
           <user-info-item :header="maintainerHeader"></user-info-item>
          </div>
        </transition>
      </div>
    </transition>
  </div>
  <div v-else>
    <div>
      <v-carousel
    height="200"
    show-arrows="hover"
    cycle
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
           <img src="../static/logo.png">
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
    </div><br>
    <div id="user-list">
      <div class="user-list-item">
        <img src="../static//userInfo.png" width="30">
        <div>个人中心</div>
      </div>
      <div class="repair-from">
        <RepairFrom :icon="true" :lenght="datasLength" :gid="gid"></RepairFrom>
      </div>
      <div class="user-list-item" @click="toHelp()">
        <img src="../static/help.png" width="30">
        <div>帮助</div>
      </div>
    </div><br>
    <div id="repairing" v-if="datasLength>0">
      <v-card class="mx-auto"  max-width="400" variant="tonal" hover>
        <h3>处理中维修</h3>
        <v-card-item >
          <v-card-title >{{ userHomeUnifinishRecord[0].location }}</v-card-title>
          <v-card-subtitle>{{userHomeUnifinishRecord[0].registerTime}}</v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <strong>报修人：</strong>{{userHomeUnifinishRecord[0].clientName}}<br>
          <strong>报修电话：</strong>{{userHomeUnifinishRecord[0].phoneNumber}}<br>
          <strong>问题：</strong>{{note }}
        </v-card-text>
        <div class="inline">
          <modify-from  :recordId="userHomeUnifinishRecord[0].id" :title="userHomeUnifinishRecord[0].location" :subtitle="userHomeUnifinishRecord[0].registerTime" :text="note" :clientName="userHomeUnifinishRecord[0].clientName" :phoneNumber="userHomeUnifinishRecord[0].phoneNumber" :isFinish="userHomeUnifinishRecord[0].isFinish" :gid="gid"></modify-from>
          <delete-modal :recordId="userHomeUnifinishRecord[0].id"></delete-modal>
        </div>
        </v-card>
    </div>
    <div v-else>
      <v-card class="mx-auto"  max-width="400" variant="tonal" hover>
        <h3>处理中维修</h3>
        <v-card-item >
          <v-card-title ><h3>你上报的维修已全部完成！</h3></v-card-title>
        </v-card-item>
      </v-card>
    </div>
    <br>
    <div id="repaired"><h3>已完成维修（个人）</h3>
      <br>
      <span>该功能还未完善，敬请期待</span>
    </div><br>
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
import {ref} from 'vue'
import RepairCard from '../components/RepairCard.vue'
import { userStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { getUserInfo } from '../api/index';
import {unfinishRepairApi} from '../api/index'
import {finishRepairApi} from '../api/index'
import { selectUniFinishRecordByUserIdApi } from '../api/index';
import UserInfoItem from '../components/UserInfoItem.vue';
import RepairFrom from '../components/RepairFrom.vue'
import ModifyFrom from '@/components/ModifyFrom.vue';
import DeleteModal from '@/components/DeleteModal.vue';
// import user from 
const store=userStore();
const userId=ref('');
const userName=ref('');
const router=useRouter();
const datas = ref();
const datass=ref();
const show = ref(false);
const gid=ref('');
const contentShow=ref('weihu');
const userInfo=ref([])
const userHeader=ref([]);
const maintainerHeader=ref([]);
const userHomeUnifinishRecord=ref();
const note=ref();
const datasLength = ref();
const snackbar = ref(false);
const snackbarText = ref('');
const snackbarTimeout = ref(6000); // Snackbar display time in milliseconds
const snackbarColor = ref('success'); // Snackbar color, you can change it as needed
userId.value=localStorage.getItem('userId');
gid.value=localStorage.getItem('gid')
userName.value=localStorage.getItem('userName');
onMounted(async () => {
  try {

    if(gid.value==='0'){
      console.log(gid.value)
      const userHomeRecordResponse=await  selectUniFinishRecordByUserIdApi(userId.value);
      userHomeUnifinishRecord.value=userHomeRecordResponse.data;
      note.value=userHomeUnifinishRecord.value[0].note;
      datasLength.value=userHomeUnifinishRecord.value ? userHomeUnifinishRecord.value.length : 0;
      console.log(datasLength.value);
    }
    if(gid.value==='2'||gid.value==='1'){
      const responses=await finishRepairApi();
      datass.value=responses.data;
      const response=await unfinishRepairApi();
      const userInfoResponse=await getUserInfo();
      userInfo.value=userInfoResponse.data.data;
      datas.value = response.data;
    }
    maintainerHeader.value=[
    {
        title: '姓名',
        align: 'center', // 将对齐方式更改为居中
        sortable: false,
        key: 'userName',
        class: 'transparent-background' // Add class for transparent background
      },
      {
        title: '年级',
        align: 'center', // 将对齐方式更改为居中
        sortable: false,
        key: 'level',
        class: 'transparent-background' // Add class for transparent background
      },
      {
        title: '电话',
        align: 'center', // 将对齐方式更改为居中
        sortable: false,
        key: 'phoneNumber',
        class: 'transparent-background' // Add class for transparent background
      },
      {
        title: '是否在职',
        align: 'center', // 将对齐方式更改为居中
        sortable: false,
        key: 'ing',
        class: 'transparent-background' // Add class for transparent background
      },
      { 
        title: 'Actions', 
        key: 'actions',         
        sortable: false, 
        align: 'center',
        class: 'transparent-background' },
    ]
    userHeader.value=[
      {
        title: 'UserName',
        align: 'center', // 将对齐方式更改为居中
        sortable: false,
        key: 'userName',
        class: 'transparent-background' // Add class for transparent background
      },
      { 
        title: 'password',
        align: 'center', 
        sortable: false,
        key: 'password',
        class: 'transparent-background' 
      },
      { 
        title: 'coded',
        key: 'coded',    
        align: 'center', 
        sortable: false, 
        class: 'transparent-background'
      },
      { 
        title: 'gid', 
        key: 'gid', 
        align: 'center', 
        sortable: false,
        class: 'transparent-background' 
      },
      { 
        title: 'Actions', 
        key: 'actions', 
        sortable: false, 
        align: 'center',
        class: 'transparent-background' },
    ]
  } catch (error) {
    console.error('Error fetching repair records:', error);
  }
});

const change = (modal) => {
  if (modal === 'unfinished') {
    show.value = false;
  } else {
    show.value = true;
  }
};

const functionChange=(modal)=>{
  if(modal==='weihu'){
    contentShow.value="weihu";
  }else if(modal==='user'){
    contentShow.value="user";
  }
}

const logout=()=>{
  snackbarText.value = '登出成功！';
  snackbarColor.value = 'success';
  snackbar.value = true;
  store.logout();
  setTimeout(() => {
      window.location.reload();
    }, 2000); // Adjust the delay as needed
}

const toHelp=()=>{
  router.push('/help')
}
</script>

<script>
  export default {
  components: { UserInfoItem },
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      }
    },
  }
</script>


<style scoped>
.inline{
  display: flex;
  margin-left:140px;
}
.repair-from-main{
  margin-top:-20px;
  font-size: 0.9rem;
  color:#bcbdbe;
}

.repair-from-main:hover{
  margin-top:-20px;
  font-size: 0.9rem;
  color:#656464;
}

.repair-from-main:active{
  margin-top:-20px;
  font-size: 0.9rem;
  color:#656464;
}
.repair-from{
  margin-top:-17px;
  font-size: 0.8rem;
  margin-left: 10px;
  width:30%;
}
.mx-auto>h3{
  position: relative;
  left:-140px;
  height: 30px;
  margin-top:10px;
  font-weight: 400;
}
#repaired>h3{
  position: relative;
  font-weight: 400;
  left:-100px;
  height: 30px;
}
#user-list{
  margin-left:-15px;
  display: flex;
}
.user-list-item>img{
  margin-left: 5px;
}
.user-list-item{
  margin-left: 20px;
  width:30%;
  font-size: 0.8rem;
}
hr{
  color:rgb(73, 71, 71);
  margin-top:10px;
  background-color: rgb(73, 71, 71);
  height:2px;
}
#content-header{
  font-size:1000;
}
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
  margin-bottom: 30px;
  padding: 0 20px; /* Optional: Add padding to the header */
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
    color: rgb(216, 216, 216);
    position: relative;
    margin-right: 55%;
    caret-color: transparent; 
  }
  .navbar {
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    margin-top: -80px;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#hello-user{
  position: relative;
  left:-32%;
}

.select-function{
  position: relative;
  margin-top:10px;
  left:6%;
  display:flex;
}

.function-item{
  border: 1px solid white;
  border-radius: 4px;
  padding:3px;
  color: rgb(251, 251, 251);
  margin-right:3px;
}

.function-active{
  border: 1px solid  rgb(138, 138, 138);
  border-radius: 4px;
  padding:3px;
  color: rgb(138, 138, 138);
  margin-right:3px;
}
</style>