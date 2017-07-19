class CustomFilter {
    constructor ($filter) {
        this.$filter = $filter;

        return (data, name, value) => {
            if (value === 'male') {
                let pattern = /^male$/;
                let filter = data.filter((el, key) => {
                    return el[name].match(pattern);
                });
                return filter;
            } else {
                let pattern = /^female$/;
                let filter = data.filter((el, key) => {
                    return el[name].match(pattern);
                });
                return filter;
            } 
        }
    };

    static filter ($filter) {
        return new CustomFilter($filter);
    };
};

angular.module('app').filter('customFilter', CustomFilter.filter);