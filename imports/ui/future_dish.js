import { Template } from 'meteor/templating';
import './future_dish.html';

import { DishesOrders } from '../api/dishes_orders.js';
import { Dishes } from '../api/dishes.js';
import  {Profiles} from '../api/profiles'

Template.FutureDish.helpers({
    future_meals() {
        var orders = DishesOrders.find({client_id: Meteor.userId()});

        var dishes_ids = [];

        orders.forEach(function (item) {
            dishes_ids.push(item.dish_id);
        });

        return Dishes.find({$and: [{_id: {$in: dishes_ids}}, {due_date: {$gte: new Date()}}]});
    },
    future_supplies() {
        var my_dishes = Dishes.find({ $and: [ {owner: Meteor.userId()}, { due_date: {$gte: new Date()}}]});

        return my_dishes;
    },
});

Template.DishOrdered.helpers({
    cooker(owner_id) {
        return Profiles.findOne({_id: owner_id}).employeeName;
    }
})