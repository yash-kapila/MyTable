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
      sortOrder[column.name].current = MyTableConstant.defaultSortOrder[1];
    });

    return sortOrder;
  }
}
