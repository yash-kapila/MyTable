<template>
	<div class="my-table-container">
		<table class="table">
			<thead>
				<tr>
					<th v-for="col in columnsConfig" :style="col.headerCellStyling">
						<my-table-header
							:column="col"
							:sortOrder="sortOrder"
							@sortColumn="sortColumn">
						</my-table-header>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in visibleRecords">
					<td v-for="col in columnsConfig" :style="col.bodyCellStyling">
						<span> {{ row[col.name] }} </span>
					</td>
				</tr>
			</tbody>
		</table>
		<my-table-pagination
			:pagination-config="pagination"
			:total-records="totalRecords"
			@fetchNewPage="fetchNewPage">
		</my-table-pagination>
	</div>
</template>

<script>
import MyTablePagination from './MyTablePagination';
import MyTableHeader from './MyTableHeader';

import MyTableService from './services/MyTableService';

export default {
  /*
  ** @prop: name
  ** @desc: name of the component
  */
  name: 'MyTable',
  /*
  ** @prop: props
  ** @desc: input properties of the component used by
  ** parent to pass data to child
  */
  props: ['gridData', 'columnsConfig', 'paginationConfig'],
  /*
  ** @prop: data
  ** @desc: bindings which will be used in the component
  */
  data() {
    return {
      pagination: {},
      visibleRecords: [],
      sortOrder: {},
    };
  },
  /*
  ** @prop: created
  ** @desc: lifecycle hook called when the component is created(not rendered though)
  */
  created() {
    this.pagination = MyTableService.paginationInitialization(this.paginationConfig);
    this.sortOrder = MyTableService.sortingInitialization(this.columnsConfig);
  },
  /*
  ** @prop: watch
  ** @desc: Like NG $watch, watches for changes to a
  ** data binding or input props and performs an action
  */
  watch: {
    gridData(newValue) {
      if (this.pagination.available) {
        this.visibleRecords = newValue.slice(0, this.pagination.size);
      } else {
        this.visibleRecords = newValue.slice(0);
      }
    },
  },
  /*
  ** @prop: computed
  ** @desc: Similar to data, contains bindings to be used in component.
  ** The values are cached and only re-evaluated if
  ** the dependencies of the computed property changes.
  */
  computed: {
    totalRecords() {
      return this.gridData.length;
    },
  },
  /*
  ** @prop: methods
  ** @desc: Functions to be used in the component
  */
  methods: {
    fetchNewPage(event) {
      const start = (event - 1) * this.pagination.size;
      const end = event * this.pagination.size;
      this.pagination.currentPage = event;
      this.visibleRecords = this.gridData.slice(start, end);
    },
    sortColumn(event) {
      console.log(event);
      return event;
    },
  },
  /*
  ** @prop: components
  ** @desc: external components to be used within this component's template
  */
  components: {
    'my-table-pagination': MyTablePagination,
    'my-table-header': MyTableHeader,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
