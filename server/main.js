import '../imports/api/tasks.js';
import '../imports/api/dishes.js';
import '../imports/api/dishes_orders.js';
import '../imports/api/images.js';
import '../imports/api/profiles.js';
import '../imports/api/la_mirpeset.js';

import { Email } from 'meteor/email'

Meteor.methods({
    sendEmail(to, from, subject, text) {
        // Make sure that all arguments are strings.
        //check([to, from, subject, text], [String]);
        // Let other method calls from the same client start running, without
        // waiting for the email sending to complete.
        this.unblock();
        Email.send({ to, from, subject, text });
    }
});