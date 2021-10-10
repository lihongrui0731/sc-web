<template>
  <div>
    <form>
      <label for="newAddress">添加网关</label>
      <input id="newAdress"
      v-model="newAddress" />
      <v-btn elevation="2" @click="addNewAddress">加入</v-btn>
    </form>
    <ul>
      <address-list
        v-for="item in addressList"
        :key="item.id"
        :address="item.title"
        @remove="removeAddress"
      ></address-list>
    </ul>
  </div>
</template>

<script>
import Address from "./address.vue";

export default {
  components: {
    "address-list": Address,
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
    },
    removeAddress(address) {
      for (const item of this.addressList) {
        if (item.title === address) {
          this.addressList.splice(this.addressList.indexOf(item), 1);
          break;
        }
      }
    },
    method3() {},
  },
};
</script>