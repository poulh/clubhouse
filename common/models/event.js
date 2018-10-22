'use strict';

module.exports = function (Event) {
    Event.observe('before save', function event(ctx, next) {
        //Set only the date. time is midnight. this allows newly-created members who are early to the event to still be considered 'new' since they are created afte the event.
        if (ctx.instance) {
            var d = ctx.instance.date;
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            d.setMilliseconds(0);
        } else if (ctx.data) {
            var d = ctx.data.date;
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            d.setMilliseconds(0);
        }
        next();
    });

    Event.download = function (id, cb) {

        let splitCamelCase = function (camelCase) {
            //add space between last lowercase letter and first uppercase. then uppercase first character.
            //myCamelCase --> My Camel Case
            return camelCase.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^\w/, c => c.toUpperCase());
        }

        let eventFilename = function (eventName) {
            //remove non-alphanumeric letters. replace spaces with hyphens
            return eventName.replace(/[^0-9a-z\s]/gi, '').replace(/\s/g, '-').toLowerCase() + ".csv";
        }

        Event.findById(id, function (err, event) {
            event.checkins.find({ include: "member" }, function (err, checkins) {
                let Member = Event.app.models.Member;

                let result = [];
                let header = [];
                if (checkins.length > 0) {
                    const remove = ["id", "accountId"];

                    let prop = Member.definition.properties;

                    header = Object.keys(Member.definition.properties).filter(key => {
                        return !remove.includes(key);
                    });

                    result.push(header);
                }

                checkins.forEach(checkin => {
                    const member = checkin.member();
                    let row = header.map(key => {

                        let val = member[key];
                        return val;
                    });
                    row.push(checkin.date);
                    result.push(row);
                });
                result[0].push("checkinDate");
                result[0] = result[0].map(field => {
                    return splitCamelCase(field);
                });

                const csv = result.map(row => {
                    return row.join(",");
                }).join("\n");

                cb(null, { data: csv, filename: eventFilename(event.name) });
            });
        });
    };

    Event.remoteMethod('download', {
        accepts: [
            { arg: 'id', type: 'number' },
        ],
        http: { path: '/download/:id', verb: 'get' },
        returns: [
            { root: true, type: 'string' }
        ]
    });
};
