<template>
  <li>
    {{ address }}
    <v-btn x-small v-on:click="$emit('remove', address)">Remove</v-btn>
  </li>
</template>

<script>
export default {
  props: ["address"],
};
</script>

<style>
</style>