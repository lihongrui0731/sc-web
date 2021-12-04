<template>
  <div class="container">
    <div class="addrSelect">
      <v-card max-width="500">
        <v-list dense>
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
                <v-list-item-title class="addrSelectTitle">{{ addr }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <p class="note">点选设备对应的地址后可查看数据</p>
    </div>

    <!-- 表格 -->
    <div class="dataTable">
      <v-data-table
        :headers="headers"
        :items="fileLinks"
        :items-per-page="10"
        class="elevation-1"
        no-data-text="当 前 未 选 中 设 备"
      >
        <template v-slot:item.name="{ item }">
          <a :href="`http://${selectedGwAddr}/tdms/${item.name}`">
            {{ item.name }}
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
    };
  },

  methods: {
    async loadLinks(addr) {
      const results = await fileListService.getDataByDevice(addr);
      console.log(results);
      this.fileLinks = results;
    },
    onSelectedChange(index) {
      this.selectedGwAddr = this.selectedGwAddrs[index];
      console.log(index);
    },
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
.addrSelectTitle {
  text-align: center;
}
.note {
  margin-top: 20px;
  margin-bottom: 20px;
  color: #535355;
  width: 150px;
  font-size: 14px;
  font-family: Arial;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 20px;
}
</style>