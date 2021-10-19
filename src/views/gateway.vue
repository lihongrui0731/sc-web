<template>
  
  <v-card
  class="mx-auto"
    color="#C7D1D5"
    dark
    max-width="500">
    <form>
      <label for="newAddress">添加网关</label>
      <input id="newAdress" v-model="newAddress" />
      <v-btn elevation="2" depressed small @click="addNewAddress">加入</v-btn>
    </form>
    <ul>
    
      <address-list
        v-for="item in addressList"
        :key="item.id"
        :gwAddress="item"
        @remove="removeAddress"
      ></address-list>
      
    </ul>
  </v-card>
  
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
        
          // id: 1,
         "192.168.1.151",
        
      ],
      nextAdress: 2,
    };
  },
  methods: {
    addNewAddress() {
      this.addressList.push(
        // id: this.nextAdressId++,
       this.newAddress,
      );
      this.newAddress = "";
      localStorage.setItem('addressList', JSON.stringify(this.addressList));
      // localStorage.setItem("addressList", this.addressList)
      // localStorage.gwAddress= this.addressList.title
    },
    removeAddress(gwAddress) {
      for (const item of this.addressList) {
        if (item === gwAddress) {
          localStorage.removeItem('addressList');
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
  border: thick double #32a1ce;
}
</style>
