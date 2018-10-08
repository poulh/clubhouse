'use strict';

module.exports = function (RegisteredUser) {

    RegisteredUser.hasRole = function (role, req, cb) {
        const userId = req.accessToken.userId;

        const roleFilter = {
            where: {
                name: role
            }
        };

        let Role = RegisteredUser.app.models.Role;
        Role.findOne(roleFilter, function (err, role) {
            if (err) {
                console.log(err);
                throw (err);
            }

            if (role) {
                const principalFilter = {
                    where: {
                        principalType: "USER",
                        principalId: userId
                    }
                };

                role.principals.findOne(principalFilter, function (err, principal) {

                    if (err) {
                        console.log(err);
                        throw (err);
                    }
                    cb(null, principal != null);
                });
            } else {
                //role does not exist, so user cannot be in it
                cb(null, false)
            }
        });
    }

    RegisteredUser.remoteMethod('hasRole', {
        accepts: [
            { arg: 'name', type: 'string', required: true },
            { arg: 'req', type: 'object', 'http': { source: 'req' } },
        ],
        description: "Returns whether authenticated User has Role",
        returns: { type: 'boolean', root: true },
        http: { path: '/hasRole', verb: 'get' }
    });

    RegisteredUser.getAuthenticatedUserRoles = function (req, cb) {
        const userId = req.accessToken.userId;

        let Role = RegisteredUser.app.models.Role;

        Role.find(function (err, roles) {
            if (err) {
                cb(err)
            }
            let roleMap = {}
            roles.forEach(role => {
                roleMap[role.id] = role.name;
            });

            let userRoles = [];
            let RoleMapping = RegisteredUser.app.models.RoleMapping;

            const filter = {
                where: {
                    principalId: userId,
                    principalType: 'USER'
                }
            };

            RoleMapping.find(filter, function (err, principals) {
                if (err) {
                    cb(err)
                }
                principals.forEach(principal => {

                    const principalId = principal.principalId;
                    const roleName = roleMap[principalId];

                    userRoles.push(roleName);
                })
                cb(null, userRoles);
            })
        });
    };

    RegisteredUser.remoteMethod('getAuthenticatedUserRoles', {
        accepts: [
            { arg: 'req', type: 'object', 'http': { source: 'req' } },
        ],
        description: "Get array of Roles for authenticated User",
        returns: { type: 'array', root: true },
        http: { path: '/roles', verb: 'get' }
    });


    RegisteredUser.patchOrCreateWithRoles = function (credentials, req, cb) {
        console.log("-----------------");
        const userId = req.accessToken.userId;
        console.log(userId);
        console.log("&^&&&&&&&&&&&")
        console.log(credentials);
        const roles = credentials.roles;
        console.log(roles);
        delete credentials.roles;
        console.log(roles);
        console.log(credentials);
        console.log("^^^^^^^^^^")

        RegisteredUser.create(credentials, function (err, registeredUser) {
            if (err) {
                console.log(err);
                throw (err);
            }

            console.log(registeredUser);
            cb(null, credentials);

        });

    };

    RegisteredUser.remoteMethod('patchOrCreateWithRoles', {
        accepts: [
            { arg: 'credentials', type: 'object', http: { source: 'body' } },
            { arg: 'req', type: 'object', 'http': { source: 'req' } },
        ],
        description: 'create or patch user with roles',
        returns: { type: 'object', root: true },
        http: { path: '/patchOrCreateWithRoles', verb: 'post' }
    });

    RegisteredUser.beforeRemote('patchOrCreateWithRoles', function (context, unused, next) {
        console.log('Putting in the car key, starting the engine.');
        next();
    });
};
