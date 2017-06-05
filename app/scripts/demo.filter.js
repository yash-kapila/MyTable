(function () {

    'use strict';

    angular.module('app').filter('customFilter', CustomFilter);

    CustomFilter.$inject = ['$filter'];

    function CustomFilter ($filter) {
        return function (data, name, value) {
            if (value === 'male') {
                var pattern = /^male$/;
                var filter = data.filter(function (el, key) {
                    return el[name].match(pattern);
                });
                return filter;
            } else {
                var pattern = /^female$/;
                var filter = data.filter(function (el, key) {
                    return el[name].match(pattern);
                });
                return filter;
            }
        }
    };
})();