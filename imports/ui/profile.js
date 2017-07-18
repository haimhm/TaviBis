import { Template } from 'meteor/templating';

import './profile.html';

import { Profiles } from '../api/profiles.js';

Template.UserProfile.helpers({
    profile() {
        return Profiles.findOne({ _id: { $eq: Meteor.userId() } });
    }
});

Template.UserProfile.events({
    'click #updateProfile'(event, instance) {
        event.preventDefault();

        Profiles.update(Meteor.userId(), {
            $set: {
                employeeName: $('#profileName').val(),
                employeeId: $('#employeeId').val(),
                emailAddress: $('#emailAddress').val()
            }
        });
    },
    'click #saveProfile'(event, instance) {
        event.preventDefault();

        Profiles.insert({
            _id: Meteor.userId(),
            employeeName: $('#profileName').val(),
            employeeId: $('#employeeId').val(),
            emailAddress: $('#emailAddress').val(),
            rank: 0,
            laMirpesetAdmin: false
        });
    },
});