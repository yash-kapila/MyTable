<template>
	<input type="text" class="form-control" v-model="filterValue" @keyup="filter($event)">
</template>

<script>
  export default {
    name: 'MyTableInputFilter',
    data() {
      return {
        filterValue: '',
        enterKeyCode: 13,
      };
    },
    methods: {
      filter(event) {
        if (event.keyCode !== this.enterKeyCode) {
          this.$emit('filterGrid', this.filterValue);
        }
      },
    },
  };
</script>

<style scoped>
	
</style>