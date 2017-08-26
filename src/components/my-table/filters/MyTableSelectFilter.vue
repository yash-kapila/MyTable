<template>
  <select v-model="selectedOption" class="form-control" @change="filter">
    <option value=""> Select </option>
    <option v-for="item in filterOptions"> {{item}} </option>
  </select>
</template>

<script>
  export default {
    name: 'MyTableSelectFilter',
    props: ['filterOptions'],
    data() {
      return {
        selectedOption: '',
      };
    },
    methods: {
      filter() {
        this.$emit('filterGrid', this.selectedOption);
      },
    },
  };
</script>

<style scoped>
	
</style>
