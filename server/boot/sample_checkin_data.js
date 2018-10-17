module.exports = function (app) {
    if (process.env.NODE_ENV === 'production') {
        console.log("production environment. no seed data.")
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

            var lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 7);

            console.log(registeredUser);

            Event.create({ name: "Next Club Event", date: today, accountId: registeredUser.accountId }, function (err, eventInstance) {
                console.log(eventInstance);
            });

            today.setMonth(today.getMonth() - 1);
            Event.create({ name: "Old Club Event", date: lastWeek, accountId: registeredUser.accountId, closed: true }, function (err, eventInstance) {
                console.log(eventInstance);
            });

            var Member = app.models.Member;

            Member.create({ firstName: "Jane", lastName: "ClubMember", email: "jane@jane.com", mobilePhone: "212-555-1234", membershipLevel: "Single", accountId: registeredUser.accountId }, function (err, memberInstance) {
                console.log(memberInstance);
            });

            Member.create({ firstName: "Sam", lastName: "Sustainer", email: "jane@jane.com", mobilePhone: "212-555-1234", membershipLevel: "Sustaining", accountId: registeredUser.accountId }, function (err, memberInstance) {
                console.log(memberInstance);
            });

            Member.create({ firstName: "Gary", lastName: "Guest", email: "jim@jim.com", mobilePhone: "212-555-5678", accountId: registeredUser.accountId }, function (err, memberInstance) {
                console.log(memberInstance);
            });

            Member.create({ firstName: "Larry", lastName: "Lifetime", email: "larry@larry.com", mobilePhone: "212-555-9999", membershipLevel: "Lifetime", accountId: registeredUser.accountId }, function (err, memberInstance) {
                console.log(memberInstance);
            });
        });

    });



};
