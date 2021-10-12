<template>
  <li>
    {{ address }}
    <v-btn v-on:click="$emit('remove',address)">Remove</v-btn>
  </li>
</template>

<script>
export default {
  props: ["address"],
};
</script>

<style>
</style>