
module.exports = function (app) {

    let Role = app.models.Role;

    //create the admin role if it doesn't already exist
    Role.find({
        where: {
            name: 'admin'
        }
    }, function (err, records) {

        var exists = records.length > 0;


        //console.log(exists)

        if (err) {
            console.log(err);
            throw err;
        }

        if (exists) {
            console.log("*************role already exists*****************");
        } else {
            console.log("*************** creating role **************")

            Role.create({
                name: 'admin'
            }, function (err, role) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log('Created role:', role);
            });
        }
    });

}
