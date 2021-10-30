<template>
  <v-sheet
  class="sheet"
  color="white"
  elevation="2"
  height="500"
  width="350"
  style="margin: auto"
>
<div 
class="type-in"
style="padding: 15px">
    <form>
      <label for="newAddress">添加网关：</label>
      <input id="newAdress" v-model="newAddress" />
      <v-btn elevation="2" depressed x-small @click="addNewAddress">加入</v-btn>
    </form>
    </div>
    <v-divider class="mx-4"></v-divider>
    <ul style="margin: 15px">
      <address-list
        v-for="item in addressList"
        :key="item.id"
        :gwAddress="item"
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
      addressList: [  ],
      nextAdress: 2,
    };
  },
  methods: {
    addNewAddress() {
      this.addressList.push(
        // id: this.nextAdressId++,
        this.newAddress
      );
      this.newAddress = "";
      localStorage.setItem("addressList", JSON.stringify(this.addressList));
    },
    removeAddress(gwAddress) {
      for (const item of this.addressList) {
        if (item === gwAddress) {
          localStorage.removeItem("addressList");
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

input {
  border: 2px solid black;
  
};
form {
display: flex;
display: flex;
  flex: auto;
  flex-wrap: nowrap
};
.type-in {
  display: flex;
display: flex;
  
  flex-wrap: nowrap
}

</style>
