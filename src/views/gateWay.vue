<template>
  <v-data-table
    :headers="headers"
    :items="gwAddress"
    :items-per-page="10"
    class="elevation-3"
  ></v-data-table>
</template>

<script>
export default {
    data () {
      return {
        headers: [
          {
            text: '网关',
            align: 'start',
            sortable: false,
            value: 'address',
          },
        ],
        gwAddress: [
          {
            address:  '192.168.1.151',
          },
          
          {
            address: '192.168.1.152',
          },
          {
            address: '192.168.1.153',
          },
          {
            address: '192.168.1.154',
          },
        ],
      }
    },
  }
</script>
