<template>
  <v-sheet
    class="front-sheet mt-4"
    color="white"
    elevation="2"
    height="500"
    width="370"
    style="margin: auto"
  >
    <div class="addNew" style="padding: 15px">
      <form class="type-in">
        <label class="addNewLabel" for="newAddress">添加网关：</label>
        <input id="newAdress" v-model="newAddress" />
        <v-btn
          elevation="2"
          depressed
          small
          height="24px"
          color="#f5f5f5"
          @click="addNewAddress"
          ><span class="addNewBtn">加入</span></v-btn
        >
      </form>
      <p class="addNewNote">
        在框内填入网关设备地址后点选[加入]按钮
      </p>
    </div>
    <v-divider class="mx-4"></v-divider>
    <ul style="margin: 15px">
      <address-list
        v-for="addr in addressList"
        :key="addr"
        :gwAddress="addr"
        @remove="removeAddress"
      ></address-list>
      <span></span>
    </ul>
  </v-sheet>
</template>

<script>
import gwAddress from "../components/address.vue";

export default {
  components: {
    "address-list": gwAddress,
  },
  data() {
    return {
      newAddress: "",
      addressList: [],
      nextAdress: 2,
    };
  },
  methods: {
    addNewAddress() {
      this.addressList.push(this.newAddress);
      this.newAddress = "";
      localStorage.setItem("addressList", JSON.stringify(this.addressList));
    },
    removeAddress(gwAddress) {
      for (const item of this.addressList) {
        if (item === gwAddress) {
          // localStorage.removeItem("addressList");
          this.addressList.splice(this.addressList.indexOf(item), 1);
          localStorage.setItem("addressList", JSON.stringify(this.addressList));
          break;
        }
      }
    },

    method3() {},
  },
  mounted() {
    this.addresses = JSON.parse(localStorage.getItem("addressList"));
    if (this.addresses) {
      this.addressList = this.addresses;
    }
  },
};
</script>
<style>
.front-sheet {
  border: 1px;
  border-color: black;
}
.addNew {
  background-color: #757575;
}
.addNewLabel {
  color: #FAFAFA;
  font-size: 16px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 20px;
  white-space: nowrap;
}
input {
  background-color: #FAFAFA;
  border: 2px solid black;
}
.type-in {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
}
.addNewBtn {
  font-size: 12px;
  font-weight: 700;
  /* color: #FAFAFA; */
}
.addNewNote {
  margin-top: 18px;
  margin-bottom: 5px;
  /* color: #535355; */
  color: #FAFAFA;
  font-size: 14px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 20px;
}
</style>
