'use strict';
const parse = require('csv-parse')

module.exports = function (Member) {

    Member.import = function (upload, req, cb) {
        //uploading stuff
        const userId = req.accessToken.userId;

        let RegisteredUser = Member.app.models.RegisteredUser;
        RegisteredUser.findById(userId, function (err, user) {
            if (err) {
                console.log(err);
                cb(err, null);
            }

            const accountId = user.accountId;

            let count = 0;
            parse(upload.data, {
                delimiter: ',',
                columns: true, //this makes the output an array of objects
                trim: true,
                skip_empty_lines: true
            })
                // Use the readable stream api
                .on('readable', function () {
                    let record
                    while (record = this.read()) {
                        record.accountId = accountId;
                        console.log(record);
                        Member.upsert(record, function (err, member) {
                            if (err) {
                                console.log(err)
                            } else {
                                count = count + 1;
                                console.log(member);
                            }

                        })
                    }
                })
                // When we are done, this callback is called.
                .on('end', function () {
                    cb(null, { count: count });

                })

        });
    };

    Member.remoteMethod('import', {
        http: { path: '/import', verb: 'post' },

        accepts: [
            { arg: 'upload', type: 'object', 'http': { source: 'body' } },
            { arg: 'req', type: 'object', 'http': { source: 'req' } }
        ],
        returns: { root: true, type: 'object' }
    });
};
