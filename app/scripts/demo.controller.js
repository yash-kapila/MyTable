class DemoCtrl {
    constructor (demoService) {
        this.demoService = demoService;
    };

    $onInit () {
        this.gridConfig = this.demoService.gridConfiguration();
        this.demoService.getDataForGrid().then((data) => {
            this.gridData = data;
        })
        .catch((err) => {
            this.gridData = [];
        });

        this.appScope = {
            testClick: this.testClick
        };
    };

    testClick () {
        console.log(record);
        let index = 0;
        for (let i=0;i<this.gridData.length;i++) {
            if (this.gridData[i].name === record.name) {
                index = i;
                break;
            }
        };

        this.gridData.splice(index, i);
    };
};

angular.module('app').controller('demoCtrl', DemoCtrl);