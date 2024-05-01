<template>
    <v-sheet
      class="d-flex flex-column"
    >
      <v-snackbar
        :timeout="2000"
        color="success"
        variant="outlined"
      >
        <template v-slot:activator="{ props }">
          <v-btn class="ma-2" color="success" variant="outlined" v-bind="props">open</v-btn>
        </template>
  
        Snackbar with <strong>outlined</strong> variant.
      </v-snackbar>
    </v-sheet>
  </template>