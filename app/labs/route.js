import AbstractModuleRoute from 'hospitalrun/routes/abstract-module-route';
export default AbstractModuleRoute.extend({
    addCapability: 'add_lab',
    allowSearch: false,
    moduleName: 'labs',
    newButtonText: '+ new lab',
    sectionTitle: 'Labs',
    subActions: [{
        text: 'Requests',
        linkTo: 'labs.index'
    }, {
        text: 'Completed',
        linkTo: 'labs.completed'
    }],

    getNewData: function() {
        return {
            selectPatient: true,
            requestDate: moment().startOf('day').toDate()
        };
    }
});

