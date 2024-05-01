<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    showLoginModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
});
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}
</style>
