import { InputFilterComponent } from '../components/my-table-header/filters/input-filter/input-filter.component';
import { SelectFilterComponent } from '../components/my-table-header/filters/select-filter/select-filter.component';
import { RadioFilterComponent } from '../components/my-table-header/filters/radio-filter/radio-filter.component';

export const myTableConfig = {
    sortOrder: {
        '0': 'NONE',
        '1': 'ASC',
        '2': 'DSC'
    },
    defaultFilterType: 'input',
    paginationConfig: {
        defaultSize: 10,
        available: false
    },
    filterType: {
        'input': InputFilterComponent,
        'select': SelectFilterComponent,
        'radio': RadioFilterComponent
    }
};