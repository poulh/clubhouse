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
};
