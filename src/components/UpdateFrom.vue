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
                <div>完成填报</div>
          </div>
        </template>
        <v-card
          title="维修完成填报"
        >
          <v-card-text>
            <v-row dense>
              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-text-field
                v-model="solution"
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
  import {ref, onMounted,defineProps} from 'vue'
  import { updateRepairRecordApi } from '../api/index';

  const userId=ref('');
  const dialog=ref(false);
  const solution=ref("");
  const snackbar = ref(false);
const snackbarText = ref('');
const snackbarTimeout = ref(6000); // Snackbar display time in milliseconds
const snackbarColor = ref('success'); // Snackbar color, you can change it as needed
const props=defineProps({
    recordId:{
        type:String,
        require:true
    }
})

  onMounted(()=>{
    userId.value=localStorage.getItem("userId");
    console.log(userId.value);
  })
  const submit=async()=>{
    try{ 
        const text=solution.value;
        await updateRepairRecordApi(props.recordId,userId.value,text);
            // Show success message
    snackbarText.value = '填报成功！';
    snackbarColor.value = 'success';
    snackbar.value = true;
    setTimeout(() => {
      window.location.reload();
    }, 2000); // Adjust the delay as needed
        dialog.value = false;
        }catch(error){
            console.log();
        }
  }

  </script>