<template>
    <div class="pa-4 text-center">
      <v-dialog
        v-model="dialog"
        max-width="600"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <div 
            variant="tonal"
            v-bind="activatorProps" 
          >
                <div>修改</div>
          </div>
        </template>
        <v-card
          title="修改"
        >
          <v-card-text>
            <v-row dense>
              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-text-field
                v-model="location"
                  label="地点*"
                  required
                ></v-text-field>
              </v-col>
  
              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-text-field
                v-model="name"
                  hint="上报该维修的人员"
                  label="登记人*"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-text-field
                v-model="phoneNumber"
                  hint="example of helper text only on focus"
                  label="联系电话*"
                ></v-text-field>
              </v-col>
              
              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-text-field
                v-model="question"
                  label="问题描述*"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-text-field
                v-if="isFinish==='yes'"
                v-model="aSolution"
                  label="解决方法*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
  
            <small class="text-caption text-medium-emphasis">*标记为必填</small>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              text="关闭"
              variant="plain"
              @click="dialog = false"
            ></v-btn>
  
            <v-btn
              color="primary"
              text="提交"
              variant="tonal"
              @click="submit()"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      :color="snackbarColor"
      top
    >
      {{ snackbarText }}
    </v-snackbar>
    </div>
  </template>
  <script setup>
  import {ref, onMounted,defineProps} from 'vue'
  import { modifyRepairRecordApi } from '@/api';
  const userId=ref('');
  const dialog=ref(false);
  const name=ref("");
  const phoneNumber=ref("");
  const location=ref("");
  const question=ref("");
  const aSolution=ref("");
  const snackbar = ref(false);
const snackbarText = ref('');
const snackbarTimeout = ref(6000); // Snackbar display time in milliseconds
const snackbarColor = ref('success'); // Snackbar color, you can change it as needed
  onMounted(()=>{
    name.value=props.clientName;
    userId.value=localStorage.getItem("userId");
    location.value = props.title;
    phoneNumber.value = props.phoneNumber;
    question.value = props.text;
    aSolution.value=props.solution;
  })
  const submit=async()=>{
    try{
      const response=await modifyRepairRecordApi(props.recordId,name.value,phoneNumber.value,location.value,question.value,aSolution.value);
          // Show success message
    snackbarText.value = '修改成功！';
    snackbarColor.value = 'success';
    snackbar.value = true;
    setTimeout(() => {
      window.location.reload();
    }, 2000); // Adjust the delay as needed
        console.log(response);
    dialog.value = false;
        }catch(error){
            console.log(error);
        }
  }

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