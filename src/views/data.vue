<template>
  <div class="data-container mt-2">
    <div class="addrSelect">
      <v-card max-width="500">
        <v-list dense>
          <v-list-item-group
            @change="onSelectedChange"
          >
          <!-- active-class="border" -->
            <!-- color="indigo" -->
            <v-list-item
              v-for="addr in selectedGwAddrs"
              :key="addr"
              @click="loadFiles(addr)"
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
        :items="fileRows"
        :items-per-page="10"
        class="elevation-1"
        no-data-text="未选中设备或暂无数据"
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
      fileRows: [
        // { name: "", time: "", size: "" },
      ],
    };
  },

  methods: {
    async loadFiles(addr) {
      const results = await fileListService.getDataByDevice(addr);
      console.log(results);
      
      this.fileRows = results;
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
.data-container {
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
  /* font-family: Arial; */
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 20px;
}
.v-data-table {
  width: 580px;
}
</style>