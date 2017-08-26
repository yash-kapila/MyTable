<template>
  <div class="radio-container">
    <div class="form-group" v-for="item in filterOptions">
      {{item }}
      <input type="radio" class="form-control" v-model="selectedOption" :value="item" @change="filter">
    </div>
  </div>
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
