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
    **  enableSorting: <Boolean> => Whether column is sortable.
    */
    const columnsConfig = [
      {
        name: 'name',
        heading: 'Name',
        headerCellStyling: nameHeaderStyles,
        enableSorting: true,
        enableFiltering: true,
        filter: {
          type: 'input',
          value: '',
        },
      },
      {
        name: 'gender',
        heading: 'Gender',
        headerCellStyling: genderHeaderStyles,
        enableSorting: true,
        enableFiltering: true,
        filter: {
          type: 'select',
          options: ['female', 'male'],
          value: '',
        },
      },
      {
        name: 'company',
        heading: 'Company',
        headerCellStyling: companyHeaderStyles,
        bodyCellStyling: companyBodyStyles,
        enableSorting: true,
        enableFiltering: false,
        filter: {
          type: 'radio',
          options: ['Enersol', 'Sealoud'],
          value: '',
        },
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
