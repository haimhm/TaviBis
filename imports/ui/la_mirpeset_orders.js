import { Template } from 'meteor/templating';

import './la_mirpeset_orders.html';

import { LmRestaurants } from '../api/la_mirpeset.js';
import { LmOrders } from '../api/la_mirpeset.js';

Template.LaMirpesetOrders.onCreated(function laMirpesetOrdersOnCreated() {
    this.state = new ReactiveDict();
});

Template.LaMirpesetOrders.helpers({
    lm_restaurants() {
        return LmRestaurants.find({ $and: [{status: {$eq: "open"}}, {next_order_date: {$gte: new Date()}}]});
        //return LmRestaurants.find({status: {$eq: "open"}});
        //return LmRestaurants.find();
    },
    lm_dishes() {
        const instance = Template.instance();
        var rest = LmRestaurants.findOne({_id: { $eq: instance.state.get('RestId')} });
        if (rest) {
            return rest.lm_dishes;
        }

        return null;
    },
});

Template.LaMirpesetOrders.events({
    'change #lmRestaurants'(event, instance) {
        event.preventDefault();
        instance.state.set('RestId', $("#lmRestaurants").val())
    },
    'click .dish-container'(event, instance) {
        var rest = LmRestaurants.findOne({_id: $("#lmRestaurants").val()});
        debugger;

        _.forEach(rest.lm_dishes, function(dish) {
            if (dish._id == $(event.target)[0].id) {
                comments = prompt("Please add your comments and approve your order");
                if (comments) {
                    LmOrders.insert({
                        rest_id: rest._id,
                        dish_id: $(event.target)[0].id,
                        user_id: Meteor.userId(),
                        final_price: dish.final_price,
                        delivery_date: rest.next_order_date,
                        comments: comments
                    });
                }

                return;
            }
        });
    },
});