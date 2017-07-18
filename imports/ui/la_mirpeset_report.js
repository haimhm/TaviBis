import { Template } from 'meteor/templating';

import './la_mirpeset_report.html';

import { LmRestaurants } from '../api/la_mirpeset.js';
import { LmOrders } from '../api/la_mirpeset.js';
import { Profiles } from '../api/profiles.js'

Template.LaMirpesetReport.helpers({
    user_name() {
        return Profiles.findOne({_id: Meteor.userId()}).employeeName;
    },
    lm_orders() {
        const instance = Template.instance();
        var dishes = [];

        var orders = LmOrders.find({user_id: Meteor.userId()});
        orders.forEach(function(order) {
            var rest = LmRestaurants.findOne({_id: {$eq: order.rest_id}});
            rest.lm_dishes.forEach(function(dish) {
                if (dish._id == order.dish_id) {
                    dish.delivery_date = order.delivery_date;
                    dishes.push(dish);
                }
            });
        });

        return dishes;
    },
});