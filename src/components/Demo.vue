<template>
  <div class="demo-container">
    <header class="demo-header">
      <h1> My Table </h1>
    </header>
    <main class="demo-main">
      <my-table 
        :grid-data="gridData"
        :columns-config="gridConfiguration.columnsConfig"
        :pagination-config="gridConfiguration.paginationConfig">
      </my-table>
    </main>
  </div>
</template>

<script>
import DemoService from '../services/DemoService';
import MyTable from './my-table/MyTable';

export default {
  name: 'demo',
  data() {
    return {
      gridData: [],
      error: {},
      gridConfiguration: {},
      msg: 'Welcome to Your Vue.js App',
    };
  },
  created() {
    this.gridConfiguration = DemoService.gridConfiguration();

    DemoService.getData()
      .then((data) => {
        this.gridData = data;
      })
      .catch((error) => {
        this.error = error;
      });
  },
  components: {
    'my-table': MyTable,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  text-align: center;
}
</style>
