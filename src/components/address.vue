<template>

  <li
  :value="addr">
    {{ gwAddress }}
    <v-btn 
    small
    depressed
    v-on:click="$emit('remove',gwAddress)">Remove</v-btn>
  </li>
  
</template>

<script>

export default {
  props: ["gwAddress"],
  data() {
    addr = null
  },
  methods:{
    
  }
};
</script>

<style>
</style>