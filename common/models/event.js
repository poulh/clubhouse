'use strict';

module.exports = function (Event) {
    Event.observe('access', async function (ctx, next) {

        if (ctx && ctx.options && ctx.options.accessToken && ctx.options.accessToken.userId) {
            const userId = ctx.options.accessToken.userId;

            let RegisteredUser = Event.app.models.RegisteredUser;
            RegisteredUser.findById(userId, function (err, user) {
                ctx.query.where = Object.assign({}, ctx.query.where, { accountId: user.accountId })
            });
        }

        return;
    });
};
