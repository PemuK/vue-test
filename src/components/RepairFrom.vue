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
          <img v-if="props.icon" src="../static/repair.png" width="30" >
          <div>维修登记</div>
        </div>
      </template>
      <v-card
        title="维修登记"
      >
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="name"
                label="姓名*"
                required
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
                v-model="building"
                hint="example of persistent helper text"
                label="楼名/教工宿舍号*"
                persistent-hint
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="unit"
                label="单元号"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="room"
                label="房间号*"
                required
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

    <!-- Snackbar -->
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
import { ref, computed, onMounted, defineProps } from 'vue';
import { addRepairRecordApi } from '../api/index';

const props = defineProps({
  icon: {
    type: Boolean,
    required: false
  },
  lenght:{
    type:Number,
    required:false
  },
  gid:{
    type:String,
    required:false
  }
});



const userId = ref('');
const dialog = ref(false);
const name = ref('');
const phoneNumber = ref('');
const building = ref('');
const unit = ref('');
const room = ref('');
const question = ref('');
const combinedField = computed(() => `${building.value}#${unit.value}#${room.value}`);
const snackbar = ref(false);
const snackbarText = ref('');
const snackbarTimeout = ref(6000); // Snackbar display time in milliseconds
const snackbarColor = ref('success'); // Snackbar color, you can change it as needed

onMounted(() => {
  userId.value = localStorage.getItem('userId');
  console.log(props.gid)
});

const submit = async () => {
  if(props.gid==='0'&&props.lenght>=1){
      snackbarText.value = '每个用户限提交一个维修,请耐心等待当前维修完成!';
      snackbarColor.value = 'error';
      snackbar.value = true;
      dialog.value = false;
      return;
    }
  try {
    const response = await addRepairRecordApi(userId.value, name.value, phoneNumber.value, combinedField.value, question.value);
    console.log(response);
    dialog.value = false;

    // Show success message
    snackbarText.value = '提交成功！';
    snackbarColor.value = 'success';
    snackbar.value = true;
    // Reload page after a short delay (optional)
    setTimeout(() => {
      window.location.reload();
    }, 2000); // Adjust the delay as needed
  } catch (error) {
    console.log(error);

    // Show error message
    snackbarText.value = '提交失败，请重试。';
    snackbarColor.value = 'error';
    snackbar.value = true;
  }
};
</script>
