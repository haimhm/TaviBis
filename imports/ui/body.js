import { Template } from 'meteor/templating';

import './body.html';

import { Tasks } from '../api/tasks.js';

Template.body.helpers({
    tasks() {
        return Tasks.find({});
    },
});