import { Template } from 'meteor/templating';
import './dish.html';

import { Profiles } from '../api/profiles.js';
import { Dishes } from '../api/dishes.js';
import { DishesOrders } from '../api/dishes_orders.js';

Template.Dish.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.Dish.helpers({
    cooker() {
        var owner_id = Template.instance().data.owner;
        return Profiles.findOne({ _id: owner_id }).employeeName;
    },
    already_ordered() {
        var data = Template.instance().data;

        var already_order = DishesOrders.find({$and: [ { dish_id: data._id }, { client_id: Meteor.userId()} ]}).count();

        return already_order != 0;
    },
});

Template.Dish.events({
    'click #order-dish'(event, instance) {

        ints = Template.instance();

        // decrease order amount by one
        Dishes.update({_id: ints.data._id}, {$inc: {unorder_amount: -1}});
        DishesOrders.insert({
            "dish_id":  ints.data._id,
            "client_id": Meteor.userId()
        })
        },
});