import { Template } from 'meteor/templating';
import './best_chefs.html';

import { Profiles } from '../api/profiles.js';

Template.BestChefs.helpers({
    best_chefs(){
        var best_chefs = Profiles.find({}, {sort: { rank: -1}, limit: 3});

        var best_chefs_names = [];

        best_chefs.forEach(function (item) {
            best_chefs_names.push(item.employeeName + " - " + item.rank);
        });

        return best_chefs_names;
    }
});
