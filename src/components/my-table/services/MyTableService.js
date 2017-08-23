import MyTableConstant from './MyTableConstant';

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
      return column.filterType ? defaultFilters[column.filterType.toLowerCase()] : '';
    }
    return '';
  }

  static filter(gridData, filterValue, columnName, filterType) {
    let filteredList = [];
    if (filterType === 'input') {
      filteredList = gridData.filter((val) => {
        const cell = val[columnName].toString().toLowerCase();
        console.log(cell);
        console.log(cell.includes(filterValue.toLowerCase));
        return cell.includes(filterValue.toLowerCase());
      });
    } else if (filterType === 'select') {
      filteredList = gridData.filter(val => val[columnName].toString());
    } else {
      return [...gridData];
    }
    return filteredList;
  }

}
