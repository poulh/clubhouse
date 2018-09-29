module.exports = function (app) {
    if (process.env.NOD_ENV === 'production') {
        return;
    }
    var Account = app.models.Account;

    Account.signup({ accountName: "Cubby's Club", firstName: "Cubby", lastName: "ClubOwner", email: "cubby@cubby.com", username: "cubby", password: "cubby" }, function (err, token) {
        if (err) {
            throw (err);
        }

        RegisteredUser = app.models.RegisteredUser;
        RegisteredUser.findById(token.userId, function (err, registeredUser) {

            var Event = app.models.Event;
            var today = new Date();

            console.log(registeredUser);

            Event.create({ name: "Club Event #1", date: today, accountId: registeredUser.accountId }, function (err, eventInstance) {
                console.log(eventInstance);
            });

            today.setMonth(today.getMonth() - 1);
            Event.create({ name: "Club Event #2", date: today, accountId: registeredUser.accountId, closed: true }, function (err, eventInstance) {
                console.log(eventInstance);
            });

            var Member = app.models.Member;

            Member.create({ firstName: "Jane", lastName: "ClubMember", email: "jane@jane.com", cellPhone: "212-555-1234", accountId: registeredUser.accountId }, function (err, memberInstance) {
                console.log(memberInstance);
            });

            Member.create({ firstName: "Jim", lastName: "Guest", email: "jim@jim.com", cellPhone: "212-555-5678", accountId: registeredUser.accountId }, function (err, memberInstance) {
                console.log(memberInstance);
            });

            Member.create({ firstName: "Larry", lastName: "Lifetime", email: "larry@larry.com", cellPhone: "212-555-9999", accountId: registeredUser.accountId }, function (err, memberInstance) {
                console.log(memberInstance);
            });
        });

    });



};
