import MyTableConstant from './MyTableConstant';

const inputFilter = (filteredList, col) => filteredList.filter((val) => {
  const cell = val[col.name].toString().toLowerCase();
  return cell.includes(col.filter.value.toLowerCase());
});

const selectFilter = (filteredList, col) => filteredList.filter((val) => {
  const pattern = new RegExp(`^${col.filter.value.toLowerCase()}$`);
  const cell = val[col.name].toString().toLowerCase();
  return cell.match(pattern);
});

export default class MyTableService {
  static paginationInitialization(paginationConfig) {
    return {
      available: paginationConfig.available,
      size: paginationConfig.size ? paginationConfig.size : 8,
      currentPage: 1,
    };
  }

  static sortingInitialization(columnsConfig) {
    const sortOrder = {};

    columnsConfig.forEach((column) => {
      sortOrder[column.name] = {};
      sortOrder[column.name].current = MyTableConstant.defaultSortOrder[0];
    });

    return sortOrder;
  }

  static sortColumn(gridData, sortOrder, column) {
    const newSortOrder = Object.assign({}, sortOrder);
    let newGridData = [...gridData];

    if (column.enableSorting) {
      Object.keys(newSortOrder).forEach((key) => {
        if (key !== column.name) {
          newSortOrder[key].current = MyTableConstant.defaultSortOrder[0];
        }
      });
      const currentOrder = sortOrder[column.name].current;
      switch (currentOrder) {
        case MyTableConstant.defaultSortOrder[0]:
          newSortOrder[column.name].current = MyTableConstant.defaultSortOrder[1];
          newGridData = newGridData.sort((a, b) => {
            if (a[column.name] > b[column.name]) return 1;
            else if (a[column.name] < b[column.name]) return -1;
            return 0;
          });
          break;
        case MyTableConstant.defaultSortOrder[1]:
          newSortOrder[column.name].current = MyTableConstant.defaultSortOrder[2];
          newGridData = newGridData.sort((a, b) => {
            if (a[column.name] < b[column.name]) return 1;
            else if (a[column.name] > b[column.name]) return -1;
            return 0;
          });
          break;
        default:
          newSortOrder[column.name].current = MyTableConstant.defaultSortOrder[0];
          newGridData = [];
      }
    }
    return {
      newGridData,
      newSortOrder,
    };
  }

  static identifyFilter(defaultFilters, column) {
    if (column.enableFiltering) {
      return column.filter.type ? defaultFilters[column.filter.type.toLowerCase()] : '';
    }
    return '';
  }

  static filter(gridData, columnsConfig) {
    let filteredList = [...gridData];
    for (let i = 0; i < columnsConfig.length; i += 1) {
      const col = columnsConfig[i];
      if (col.enableFiltering) {
        switch (col.filter.type) {
          case MyTableConstant.filterType.InputFilter:
            filteredList = inputFilter(filteredList, col);
            break;
          case MyTableConstant.filterType.SelectFilter:
            if (col.filter.value !== '') {
              filteredList = selectFilter(filteredList, col);
            }
            break;
          case MyTableConstant.filterType.RadioFilter:
            if (col.filter.value !== '') {
              filteredList = selectFilter(filteredList, col);
            }
            break;
          default:
            return filteredList;
        }
      }
    }
    return filteredList;
  }

}
