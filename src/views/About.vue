<template>
  <div>
    <!--  <v-card class="mx-auto" tile>
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
    </v-card> -->
    <!-- <div class="d-flex">
      <v-checkbox v-model="disabled" label="LOCK"></v-checkbox>
    </div> -->
    <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
      <v-expansion-panel
        v-for="addr in selectedGwAddr"
        :key="addr"
        :gw-address="addr"
        @click="loadLinks(addr)"
      >
        <!-- <v-expansion-panel-header>{{ addr }}</v-expansion-panel-header> -->
        <v-expansion-panel-header>{{addr}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="headers"
            :items="downloadLinks"
            :items-per-page="5"
            class="elevation-1"
          >
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import fileListService from "../services/fileList";
export default {
  data() {
    return {
      //panel属性
      panel: [0, 1],
      disabled: false,

      selectedGwAddr: [],

      // downloadLinks: [{ name: results }],

      headers: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "Time", value: "time" },
        { text: "Size", value: "size" },
      ],
      downloadLinks: [
        // { name: " " },
        { name: "downloadLink1", time: "YYYMMDDHHmmss", size: "188M" },
        { name: "downloadLink2", time: "YYYMMDDHHmmss", size: "188M" },
      ],
      downloadLink: "11",
    };
  },

  methods: {
    async linkFile(addr) {
      let results = await fileListService.getDataByDevice();
     
      return results;
    },

    loadLinks(addr) {
      // this.downloadLink = results;

      this.downloadLinks.fill( {name: this.results});
      // this.downloadLink=''
      
    },
  },
  
  mounted() {
    this.selectedGwAddr = JSON.parse(localStorage.getItem("addressList"));
    // this.downloadLinks = JSON.parse(localStorage.getItem("addressList"));
  },
};
</script>
<style>
</style>