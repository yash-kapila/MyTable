import axios from 'axios';

export default class DemoService {
  static gridConfiguration() {
    const nameHeaderStyles = {
      width: '35%',
      color: 'red',
    };

    const genderHeaderStyles = {
      width: '35%',
      color: 'green',
    };

    const companyHeaderStyles = {
      width: '30%',
      color: 'gray',
    };

    const companyBodyStyles = {
      color: 'blue',
    };

    /*
    **  Columns Config:
    **  name: <String> => unique identifier for the column
    **  heading: <String> => Column heading in the grid
    **  headerCellStyling: <Object> => Key/Value styles applicable to column headers.
    **  Example: { color: 'red' }
    **  bodyCellStyling: <Object> => Key/Value styles applicable to column cells.
    **  Example: { color: 'red' }
    */
    const columnsConfig = [
      {
        name: 'name',
        heading: 'Name',
        headerCellStyling: nameHeaderStyles,
      },
      {
        name: 'gender',
        heading: 'Gender',
        headerCellStyling: genderHeaderStyles,
      },
      {
        name: 'company',
        heading: 'Company',
        headerCellStyling: companyHeaderStyles,
        bodyCellStyling: companyBodyStyles,
      },
      {
        name: 'action',
        heading: 'Action',
      },
    ];

    /*
    **  Pagination Config:
    **  available: <Boolean> => Grid should have pagination or not
    **  size: <Number> => Number of records per page
    */
    const paginationConfig = {
      available: true,
      size: 10,
    };

    return {
      columnsConfig,
      paginationConfig,
    };
  }

  static getData() {
    return axios.get('./static/data.json')
      .then(response => response.data)
      .catch(error => Promise.reject({
        data: error.response.data,
        status: error.response.status,
      }));
  }

}
