<template>
  <div class="container">
    <div class="addrSelect">
      <v-card max-width="500">
        <v-list>
          <v-list-item-group
            v-model="model"
            active-class="border"
            color="indigo"
          >
            <v-list-item
              v-for="addr in selectedGwAddr"
              :key="addr"
              @click="loadLinks(addr)"
            >
              <!-- 网关地址 -->
              <v-list-item-content>
                <v-list-item-title>{{ addr }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
    <div class="dataTable">
      <!-- v-for="addr in selectedGwAddr" -->
      <!-- :key="addr" -->
      <v-data-table
        :headers="headers"
        :items="downloadLinks"
        :items-per-page="10"
        class="elevation-1"
      >
      </v-data-table>
    </div>
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
      //dataTable
      headers: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "Time", value: "time" },
        { text: "Size", value: "size" },
      ],
      downloadLinks: [
        // { name: " ", time: " ", size: " " },
        { name: "downloadLink1", time: "YYYMMDDHHmmss", size: "188M" },
        // { name: "downloadLink2", time: "YYYMMDDHHmmss", size: "188M" },
      ],
      
    };
  },

  methods: {
    async linkFile(addr) {
      let results = await fileListService.getDataByDevice(addr);

      return results;
    },

    loadLinks(addr) {
      this.linkFile(addr);

      this.downloadLinks.splice({ name: this.results, time: "1", size: "2" });
    },
  },

  mounted() {
    this.selectedGwAddr = JSON.parse(localStorage.getItem("addressList"));
    // this.downloadLinks = JSON.parse(localStorage.getItem("addressList"));
  },
};
</script>
<style>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.border {
  border: 2px dashed orange;
}
</style>