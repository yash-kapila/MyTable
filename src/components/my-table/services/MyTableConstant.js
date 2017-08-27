export default {
  defaultSortOrder: {
    0: 'NONE',
    1: 'ASC',
    2: 'DSC',
  },
  filterType: {
    InputFilter: 'input',
    SelectFilter: 'select',
    RadioFilter: 'radio',
  },
  defaultFilters: {
    input: 'my-table-input-filter',
    select: 'my-table-select-filter',
    radio: 'my-table-radio-filter',
  },
  defaultBodyCellTemplate: '<span> {{ row[col.name] }} </span>',
};
