<template>
    <div class="text-center pa-4">
      <v-dialog
        v-model="dialog"
        max-width="400"
        persistent
      >
        <template v-slot:activator="{ props: activatorProps }">
            <div 
            variant="tonal"
            v-bind="activatorProps" 
          >
                <div>删除</div>
          </div>
        </template>
  
        <v-card
          prepend-icon="mdi-map-marker"
          text="删除后无法恢复，请慎重考虑！"
          title="是否删除"
        >
          <template v-slot:actions>
            <v-spacer></v-spacer>
  
            <v-btn @click="dialog = false">
              取消
            </v-btn>
  
            <v-btn @click="submit()">
              确认
            </v-btn>
          </template>
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
  import {ref,defineProps} from 'vue'
  import { deleteRepairRecordByRecordIdApi } from '@/api';
  const props=defineProps({
    recordId:{
        type:String,
        required:true
    }
  })
  const dialog=ref();
  const snackbar = ref(false);
const snackbarText = ref('');
const snackbarTimeout = ref(6000); // Snackbar display time in milliseconds
const snackbarColor = ref('success'); // Snackbar color, you can change it as needed
  const submit=async()=>{
    try{
        const response=await deleteRepairRecordByRecordIdApi(props.recordId)
        dialog.value = false;
            // Show success message
        snackbarText.value = '删除成功！';
        snackbarColor.value = 'success';
        snackbar.value = true;
        setTimeout(() => {
      window.location.reload();
    }, 2000); // Adjust the delay as needed
        console.log(response);
    }catch(error){
        console.log(error)
    }
  } 
  </script>