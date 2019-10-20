
module.exports = function (app) {
    if (process.env.DATASOURCE_MIGRATION === 'mongodb') {
        console.log("no db migration attempted. env not set")
        return;
    }
    console.log("--------------------------auto_migrate_boot")
    'use strict'
    console.log(app.dataSources);
    var dataSource = app.dataSources.db;

    console.log('-- Models found:', Object.keys(app.models));

    for (var model in app.models) {
        console.log("Checking if table for model " + model + " is created and up-to-date in DB...");
        dataSource.isActual(model, function (err, actual) {
            //if (actual) {
            //  console.log("Model " + model + " is up-to-date. No auto-migrated.");
            //} else {
            console.log('Difference found! Auto-migrating model ' + model + '...');
            dataSource.automigrate(model, function () {
                console.log("Auto-migrated model " + model + " successfully.");
            });
            //}
        });
    }
};