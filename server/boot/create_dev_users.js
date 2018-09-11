module.exports = function (app) {
    var User = app.models.User;
    User.create({ email: 'foo@bar.com', username: 'foo', password: 'bar' }, function (err, userInstance) {
        console.log(userInstance);

        var Account = app.models.Account;
        Account.create({ name: "WSRC" }, function (err, accountInstance) {
            console.log(accountInstance)

            var Event = app.models.Event;
            var today = new Date();
            Event.create({ name: "Mobilizing for the Midterms", date: today, accountId: accountInstance.id }, function (err, eventInstance) {
                console.log(eventInstance);
            });

            //var Event = app.models.Event;
            //var today = new Date();
            Event.create({ name: "The Grave Above the Grave", date: today, accountId: accountInstance.id }, function (err, eventInstance) {
                console.log(eventInstance);
            });
        });

    });



};