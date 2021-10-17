<template>
  <li>
    {{ gwAddress }}
    <v-btn v-on:click="$emit('remove',gwAddress)">Remove</v-btn>
  </li>
</template>

<script>

export default {
  props: ["gwAddress"],
};
</script>

<style>
</style>