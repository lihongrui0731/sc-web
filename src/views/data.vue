<template>
  <div>
    <v-card class="mx-auto" tile>
      <v-list-item>
        <v-list-item-content>
          <v-btn
            v-for="addr in selectedGwAddr"
            :key="addr"
            :gw-address="addr"
            @click="linkFile(addr)"
          >
            <label>
              {{ addr }}
            </label>
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-data-table :headers="headers" :items="addr" class="elevation-1">
    </v-data-table>
  </div>
</template>

<script>
import fileListService from "../services/fileList";
var url= "";
var selectedGwAddr=[]
export default {
  data() {
    return {
      selectedGwAddr: [],

      headers: {
        []
      }
    };
  },


methods: {
  async linkFile(addr) {
    let results =await fileListService.getDataByDevice( )
    console.log(results)
  }
},
  mounted() {
    this.selectedGwAddr = JSON.parse(localStorage.getItem("addressList"));
url= fileListService.getDataByDevice()+"/tdms"
// console.log(url)
  },
};
</script>
<style>
</style>