<template>
	<div class="my-table-header-container" @click.stop="sort(column)">
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
</template>

<script>
import MyTableConstant from './services/MyTableConstant';

export default {
  name: 'MyTableHeader',
  props: ['column', 'sortOrder'],
  data() {
    return {
      defaultSortOrder: MyTableConstant.defaultSortOrder,
    };
  },
  methods: {
    sort(column) {
      this.$emit('sortColumn', column);
    },
  },
};
</script>

<style scoped>
	.sort-icon-container {
		cursor: pointer;
	}
</style>