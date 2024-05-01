<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
  >
    <template v-slot:top>

        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="rgb(58, 58, 58)"
              dark
              v-bind="props"
            >
              New USER
            </v-btn>
          </template>
          <v-card class="style">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.userName"
                      label="UserName"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.password"
                      label="password"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.coded"
                      label="coded"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.gid"
                      label="gid"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    sm="6"
                  >
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="save(item)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { updateUserInfoApi } from '@/api';
import { deleteUserInfoApi } from '@/api';
export default {
  props: {
    userInfo: {
      type: Array,
      required: true
    },
    header:{
      type: Array,
      required: true
    }
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers:[],

    desserts: [],
    editedIndex: -1,
    editedItem: {
      userName: '',
      password: '',
      coded: 1,
      gid: 0,
    },
    defaultItem: {
      userName: '',
      password: 0,
      coded: 0,
      gid: 0,
    },
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New User' : 'Edit User'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.headers = this.header;
    this.initialize()
  },

  methods: {
    initialize () {
      this.desserts = this.userInfo;
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
        this.dialog = true 
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      console.log()
    },

    async deleteItemConfirm () {
      try{
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
        const response=await deleteUserInfoApi(this.editedItem.userId);
        if(response.data.code==200){
          //删除成功提示符号
        }
      }catch(error){
        console.log(error);
      }
     
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
  if (this.editedIndex > -1) {
    const item = this.editedItem;
    Object.assign(this.desserts[this.editedIndex], this.editedItem);
    console.log(item);
    updateUserInfoApi(item.userId, item.userName, item.password, item.coded, item.gid)
      .then(response => {
        if ( response.data.data==='update success') {
         console.log(1);
        }
      })
      .catch(error => {
        console.error(error); // 处理异步操作中的错误
      }); 
  } else {
    this.desserts.push(this.editedItem);
  }
  this.close();
},

  },
}
</script>

<style>
.style{
  background-color: rgb(58, 58, 58);
}
.transparent-background th {
  background-color: transparent ;
}
</style>
