import '../imports/startup/accounts-config.js';
import '../imports/ui/open_dishes.js';
import '../imports/ui/add_dish.js';
import '../imports/ui/dish.js';
import '../imports/ui/upload_form.js';
import '../imports/ui/profile.js';
import '../imports/ui/future_dish.js';
import '../imports/ui/history_dish.js';
import '../imports/ui/la_mirpeset_orders.js';
import '../imports/ui/la_mirpeset_report.js';
import '../imports/ui/la_mirpeset_admin.js';
import '../imports/ui/la_mirpeset_dish.js';
import '../imports/ui/best_chefs.js';

import { Profiles } from '../imports/api/profiles.js';

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD-MM-YYYY');
});

Template.mainTemplate.helpers({
    is_lm_admin() {
        var profile = Profiles.findOne({ _id: { $eq: Meteor.userId() } });
        if (profile) {
            return profile.laMirpesetAdmin;
        }

        return false;
    },
    is_koi_slave() {
        var profile = Profiles.findOne({ _id: { $eq: Meteor.userId() } });
        if (profile) {
            return profile.koi_slave;
        }

        return false;
    }
});

Template.mainTemplate.events({
    'click #koi_begging'(event, instance) {
        event.preventDefault();

        var koi_slaves = Profiles.find({koi_slave: true});

        koi_slaves.forEach(function (slave) {
            if (slave._id != Meteor.userId()) {
                Meteor.call(
                    'sendEmail',
                    slave.emailAddress,
                    'Slave <superfinaltone@gmail.com>',
                    'How about some Koi?',
                    'Lets order together.'
                );

                console.log(slave.employeeName);
            }
        });
        console.log("Koi slaves notified");
    },
});