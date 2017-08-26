<template>
	<div class="my-table-container">
		<table class="table">
			<thead>
				<tr>
					<th v-for="col in columnsConfig" :style="col.headerCellStyling">
						<my-table-header
							:column="col"
							:sortOrder="sortOrder"
							@sortColumn="sortColumn"
							@filterGrid="filterGrid">
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
      orderedData: [],
      sortOrder: {},
      filteredList: [],
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
      this.visibleRecords = this.setupPagination(newValue);
      this.filteredList = [...this.gridData];
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
      return this.filteredList.length;
    },
  },
  /*
  ** @prop: methods
  ** @desc: Functions to be used in the component
  */
  methods: {
    /*
    ** Callback from pagination component. Fetches visible records for next page.
    */
    fetchNewPage(event) {
      const start = (event - 1) * this.pagination.size;
      const end = event * this.pagination.size;
      this.pagination.currentPage = event;

      if (this.orderedData.length) {
        this.visibleRecords = this.orderedData.slice(start, end);
      } else {
        this.visibleRecords = this.filteredList.slice(start, end);
      }
    },
    /*
    ** Callback from header component.
    */
    sortColumn(event) {
      // Sort gridData in a pure function and pass sorted grid to setupPagination()
      const sortedColumnData = MyTableService.sortColumn(this.filteredList, this.sortOrder, event);
      this.orderedData = sortedColumnData.newGridData;
      this.sortOrder = sortedColumnData.newSortOrder;

      const gridData = this.orderedData.length ? this.orderedData : this.filteredList;
      this.visibleRecords = this.setupPagination(gridData);
      this.pagination.currentPage = 1;
    },
    /*
    ** Method called when component is created. Sets up pagination if required.
    */
    setupPagination(gridData) {
      if (this.pagination.available) {
        return gridData.slice(0, this.pagination.size);
      }
      return [...gridData];
    },
    /*
    ** Callback from header component to filter records. Set pagination after list is filtered.
    */
    filterGrid() {
      if (this.orderedData.length) {
        this.filteredList = MyTableService.filter(this.orderedData, this.columnsConfig);
      } else {
        this.filteredList = MyTableService.filter(this.gridData, this.columnsConfig);
      }
      this.visibleRecords = this.setupPagination(this.filteredList);
      this.pagination.currentPage = 1;
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
.my-table-container > .table > thead > tr > th {
	vertical-align: middle;
}
</style>
