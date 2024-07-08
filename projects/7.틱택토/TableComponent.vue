<script>
  import TrComponent from './TrComponent.vue'

  export default {
    props: {
      tableData: Array,
    },
    components: {
      TrComponent,
    }
  }
</script>

<template>
  <table>
    <tr-component v-for="(rowData, index) in tableData" :row-data="rowData" :row-index="index"></tr-component>
  </table>
</template>
