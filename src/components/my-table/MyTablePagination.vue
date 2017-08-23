<template>
	<div class="my-table-pagination-container" v-if="showPaginationBar">
		<ul class="pagination pull-right">
			<li v-for="page in paginationBar"
				:class="{'active': page === paginationConfig.currentPage}"
				@click="newPage(page)">				
				<a href="#"> {{page}} </a>
			</li>
		</ul>
	</div>
</template>

<script>
  export default {
    name: 'MyTablePagination',
    props: {
      totalRecords: {
        type: Number,
        required: true,
      },
      paginationConfig: {
        type: Object,
        default: () => ({ available: true, size: 8, currentPage: 1 }),
      },
    },
    computed: {
      paginationBar() {
        const paginationBar = [];
        let totalPages = 1;
        if (this.totalRecords % this.paginationConfig.size === 0) {
          totalPages = this.totalRecords / this.paginationConfig.size;
        } else {
          totalPages = Math.floor(this.totalRecords / this.paginationConfig.size) + 1;
        }
        for (let i = 1; i <= totalPages; i += 1) {
          paginationBar.push(i);
        }
        return paginationBar;
      },
      showPaginationBar() {
        return this.paginationConfig.available && this.paginationBar.length !== 1;
      },
    },
    methods: {
      newPage(page) {
        this.$emit('fetchNewPage', page);
      },
    },
  };
</script>

<style scoped>
	
</style>
