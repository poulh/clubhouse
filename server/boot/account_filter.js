var loopback = require('loopback');
console.log("sample")
module.exports = function (app) {

    console.log(typeof app);

    var Account = app.models.Account;



    for (let modelRelationName in Account.definition.settings.relations) {

        const modelMeta = Account.definition.settings.relations[modelRelationName];

        const modelName = modelMeta['model'];

        let M = loopback.getModel(modelName);
        console.log("Setting up access hooks for %s", M.modelName);

        M.observe("access", function logQuery(ctx, next) {
            console.log('access: %s query:', ctx.Model.modelName)
            console.log(ctx.query);
            next();
        });

        M.observe("access", function accountAccessFilter(ctx, next) {
            // console.log(ctx)

            if (ctx && ctx.options && ctx.options.accessToken && ctx.options.accessToken.userId) {

                const userId = ctx.options.accessToken.userId;

                let RegisteredUser = ctx.Model.app.models.RegisteredUser;
                RegisteredUser.findById(userId, function (err, user) {
                    ctx.query.where = Object.assign({}, ctx.query.where, { accountId: user.accountId })
                    console.log(ctx.query)
                    next();
                });
            } else {
                console.log("not logged in");
                next();
            }
        });

        M.observe("before save", function accountBeforeSaveFilter(ctx, next) {

            if (ctx && ctx.options && ctx.options.accessToken && ctx.options.accessToken.userId) {
                console.log('before save: %s', ctx.Model.modelName)

                const userId = ctx.options.accessToken.userId;

                let RegisteredUser = ctx.Model.app.models.RegisteredUser;
                RegisteredUser.findById(userId, function (err, user) {
                    if (ctx.instance) {
                        console.log("instance");
                        ctx.instance.accountId = user.accountId;
                        console.log(ctx.instance);

                    } else {
                        console.log("data");
                        ctx.data['accountId'] = user.accountId;
                        console.log(ctx.data);
                    }

                    next();
                });
            }
            else {
                console.log("not logged in")
                next();
            }
        });
    }
}