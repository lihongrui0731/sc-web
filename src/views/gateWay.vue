<template>
  <div>
    <form>
      <label for="newAddress">添加网关</label>
      <input id="newAdress" v-model="newAddress" />
      <v-btn elevation="2" @click="addNewAddress">加入</v-btn>
    </form>
    <ul>
      <address-list
        v-for="item in addressList"
        :key="item.id"
        :gwAddress="item.title"
        @remove="removeAddress"
      ></address-list>
    </ul>
  </div>
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
      addressList: [
        {
          id: 1,
          title: "192.168.1.151",
        },
      ],
      nextAdress: 2,
    };
  },
  methods: {
    addNewAddress() {
      this.addressList.push({
        id: this.nextAdressId++,
        title: this.newAddress,
      });
      this.newAddress = "";
      // localStorage.setItem('addressList', "JSON.stringify(this.addressList.title)");
      // localStorage.setItem("addressList", this.addressList.title)
      localStorage.gwAddress= this.addressList.title
    },
    removeAddress(gwAddress) {
      for (const item of this.addressList) {
        if (item.title === gwAddress) {
          this.addressList.splice(this.addressList.indexOf(item), 1);
          break;
        }
      }
    },
    
    method3() {},
  },
};
</script>
<style>
</style>