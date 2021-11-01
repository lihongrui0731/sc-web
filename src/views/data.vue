<template>
  <div class="container">
    <div class="addrSelect">
      <v-card max-width="500">
        <v-list>
          <v-list-item-group
            active-class="border"
            color="indigo"
            @change="onSelectedChange"
          >
            <v-list-item
              v-for="addr in selectedGwAddrs"
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

    <!-- 表格 -->
    <div class="dataTable">
      <v-data-table
        :headers="headers"
        :items="fileLinks"
        :items-per-page="10"
        class="elevation-1"
        no-data-text="当 前 无 数 据"
      >
      <template
      v-slot:item.name="{item}"
      >
<a :href="`http://${selectedGwAddr}/tdms/${item.name}`" >
  {{item.name}}
  </a>
      </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import fileListService from "../services/fileList";

export default {
  data() {
    return {
selectedGwAddr: null,
      selectedGwAddrs: [],
      //dataTable
      headers: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "Time", value: "mtime" },
        { text: "Size", value: "size" },
      ],
      fileLinks: [
        // { name: "", time: "", size: "" },
      ],
     /*  slots: [
        fileLinks.name
      ] */
    };
  },

  methods: {
   
    async loadLinks(addr) {
      const results= await fileListService.getDataByDevice(addr);
      this.fileLinks = results;
    },
    onSelectedChange(index) {
      this.selectedGwAddr = this.selectedGwAddrs[index]
      console.log(index)
    }
  },

  mounted() {
    this.selectedGwAddrs = JSON.parse(localStorage.getItem("addressList"));
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