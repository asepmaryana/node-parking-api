'use strict';

module.exports = function (app) {
    const fareController = require('./controller/fareController')
    const vehicleController = require('./controller/vehicleController')
    const userController = require('./controller/userController')
    const statisticController = require('./controller/statisticController')
    const reportController = require('./controller/reportController')
    const exportController = require('./controller/exportController')
    const roleController = require('./controller/roleController')
    const authController = require('./controller/authController')

    app.route('/api/statistik')
        .get(statisticController.statistic)
    
    app.route('/api/fares')
        .get(fareController.lists)
        
    app.route('/api/fare/:id')
        .get(fareController.find)

    app.route('/api/fare')
        .post(fareController.store)
    
    app.route('/api/fare')
        .put(fareController.update)

    app.route('/api/fare/:id')
        .delete(fareController.delete)

    app.route('/api/vehicles')
        .get(vehicleController.lists)

    app.route('/api/vehicle/:id')
        .get(vehicleController.find)
    
    app.route('/api/report/daily/:date/:vehicle_id')
        .get(reportController.getDaily)
    
    app.route('/api/report/recap/:from/:to')
        .get(reportController.getRecapitulation)

    app.route('/api/export/daily/:date/:vehicle_id')
        .get(exportController.getDaily)

    app.route('/api/export/recap/:from/:to')
        .get(exportController.getRecapitulation)

    app.route('/api/users')
        .get(userController.lists)

    app.route('/api/roles')
        .get(roleController.getRoles)
        
    app.route('/auth/login')
        .post(authController.login)
}
