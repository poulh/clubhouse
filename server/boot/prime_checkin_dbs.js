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
            today.setMonth(today.getMonth() - 1);
            Event.create({ name: "The Grave Above the Grave", date: today, accountId: accountInstance.id, locked: true }, function (err, eventInstance) {
                console.log(eventInstance);
            });

            var Member = app.models.Member;

            Member.create({ firstName: "Poul", lastName: "Hornsleth", email: "poulh@umich.edu", cellPhone: "212-316-1686" }, function (err, memberInstance) {
                console.log(memberInstance);
            });

            Member.create({ firstName: "Joe", lastName: "Maffia", email: "jam@joemaffia.com", cellPhone: "212-555-1686" }, function (err, memberInstance) {
                console.log(memberInstance);
            });

            Member.create({ firstName: "Stephen", lastName: "Evans", email: "sme3@nyc.rr.com", cellPhone: "212-333-1686" }, function (err, memberInstance) {
                console.log(memberInstance);
            });
        });

    });



};