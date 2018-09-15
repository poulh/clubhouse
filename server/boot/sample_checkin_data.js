module.exports = function (app) {

    var Account = app.models.Account;

    Account.signup({ accountName: "Cubby's Club", firstName: "Cubby", lastName: "ClubOwner", email: "cubby@cubby.com", username: "cubby", password: "cubby" }, function (err, token) {
        if (err) {
            throw (err);
        }

        Client = app.models.Client;
        Client.findById(token.userId, function (err, client) {

            var Event = app.models.Event;
            var today = new Date();

            Event.create({ name: "Club Event #1", date: today, accountId: client.accountId }, function (err, eventInstance) {
                console.log(eventInstance);
            });

            today.setMonth(today.getMonth() - 1);
            Event.create({ name: "Club Event #2", date: today, accountId: client.accountId, locked: true }, function (err, eventInstance) {
                console.log(eventInstance);
            });

            var Member = app.models.Member;

            Member.create({ firstName: "Jane", lastName: "ClubMember", email: "jane@jane.com", cellPhone: "212-555-1234" }, function (err, memberInstance) {
                console.log(memberInstance);
            });

            Member.create({ firstName: "Jim", lastName: "Guest", email: "jim@jim.com", cellPhone: "212-555-5678" }, function (err, memberInstance) {
                console.log(memberInstance);
            });

            Member.create({ firstName: "Larry", lastName: "Lifetime", email: "larry@larry.com", cellPhone: "212-555-9999" }, function (err, memberInstance) {
                console.log(memberInstance);
            });
        });

    });



};
