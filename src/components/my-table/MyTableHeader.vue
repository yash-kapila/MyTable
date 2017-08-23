<template>
	<div class="my-table-header-container" @click.stop="sort(column)">
		<div class="column-heading">
			<span> {{ column.heading }} </span>
			<div class="pull-right" v-if="column.enableSorting">
				<div class="sort-icon-container">
					<span v-if="sortOrder[column.name].current === defaultSortOrder[1]">
						<i class="glyphicon glyphicon-chevron-up sort-icon"> </i>
					</span>
					<span v-else-if="sortOrder[column.name].current === defaultSortOrder[2]">
						<i class="glyphicon glyphicon-chevron-down sort-icon"> </i>
					</span>
					<span v-if="sortOrder[column.name].current === defaultSortOrder[0]">
						&nbsp;
					</span>
				</div>
			</div>
		</div>
		<div class="column-filter" v-if="column.enableFiltering" @click.stop>
			<div :is="filter" @filterGrid="filterGrid"></div>
		</div>
	</div>
</template>

<script>
import MyTableInputFilter from './filters/MyTableInputFilter';

import MyTableService from './services/MyTableService';
import MyTableConstant from './services/MyTableConstant';

export default {
  name: 'MyTableHeader',
  props: ['column', 'sortOrder'],
  data() {
    return {
      defaultSortOrder: MyTableConstant.defaultSortOrder,
      filter: MyTableService.identifyFilter(MyTableConstant.defaultFilters, this.column),
    };
  },
  methods: {
    sort(column) {
      this.$emit('sortColumn', column);
    },
    filterGrid(event) {
      this.$emit('filterGrid', event, this.column.name, this.column.filterType);
    },
  },
  components: {
    'my-table-input-filter': MyTableInputFilter,
  },
};
</script>

<style scoped>
	.my-table-header-container {
		cursor: pointer;
	}
</style>