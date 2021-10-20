<template>
  <v-card class="mx-auto" tile>
    <v-list-item>
      <v-list-item-content>
        <v-btn>
            <label for="selectedGwAddr.id">
            {{ selectedGwAddr }}
            </label>
            </v-btn>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
//  import DataService from '@/services/data'
import gwAddress from "../components/address.vue";

export default {
  data() {
    return {
      selectedGwAddr: [],
    };
  },
  mounted() {
    this.selectedGwAddr = JSON.parse(localStorage.getItem("addressList"));
  },
};
</script>
