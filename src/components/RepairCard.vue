<template>
  <v-card
    class="mx-auto my-8"
    elevation="16"
    max-width="344"
    color="black"
  >
  
    <v-card-item>
      <v-card-title>
        {{ props.title }}
      </v-card-title>
      <v-card-subtitle>
        {{ props.subtitle }}
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <span style="font-weight: 1000; color: azure;">问题：</span>{{ props.text }} <br>
      <span style="font-weight: 1000; color: azure;">登记人：</span>{{ props.clientName }} <br>
      <span style="font-weight: 1000; color: azure;">联系电话：</span>{{ props.phoneNumber }} <br>
      <div v-if="props.isFinish==='yes'">
        <span style="font-weight: 1000; color: azure;">解决方法：</span>{{ props.solution }}<br>  
        <span style="font-weight: 1000; color: azure;">完成人：</span>{{ props.reporter }}  
      </div> 
      </v-card-text>
      <div id="inline">
        <modify-from  v-if="props.gid==='2'" :recordId="props.recordId" :userId="props.userId" :title="props.title" :subtitle="props.subtitle" :text="props.text" :clientName="props.clientName" :phoneNumber="props.phoneNumber" :isFinish="props.isFinish" :gid="gid" :solution="props.solution"></modify-from>
        <update-from  v-if="props.isFinish==='no'" :recordId="props.recordId" ></update-from>
        <span v-else>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <delete-modal v-if="props.gid==='2'" :recordId="props.recordId"></delete-modal>
      </div>
  </v-card>
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
import UpdateFrom from '../components/UpdateFrom.vue'
import ModifyFrom from '../components/ModifyFrom.vue'
import DeleteModal from '../components/DeleteModal.vue'
import { defineProps } from 'vue';
const props = defineProps({
  recordId:{
    type:String,
    required:true
  },
  userId:{
    type:String,
    required:true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true // 将 require 修改为 required
  },
  isFinish:{
    type:String,
    required:true
  },
  gid:{
    type:String,
    required:true
  },
  solution:{
    type:String,
    required:false
  },
  reporter:{
    type:String,
    required:false
  },
  phoneNumber:{
    type:String,
    required:true
  },
  clientName:{
    type:String,
    required:true
  }
});
</script>
<style scoped>
#inline{
  display: flex;
  align-items: center;
  margin-left:70px;
  font-size:0.8rem;
}
</style>