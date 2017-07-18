import { Template } from 'meteor/templating';
import './history_dish.html';

import { DishesOrders } from '../api/dishes_orders.js';
import { Dishes } from '../api/dishes.js';
import { Profiles } from '../api/profiles.js';

Template.HistoryDish.helpers({
    old_meals() {
        var orders = DishesOrders.find({client_id: Meteor.userId()});

        var dishes_ids = [];

        orders.forEach(function (item) {
            dishes_ids.push(item.dish_id);
        });

        return Dishes.find({$and: [{_id: {$in: dishes_ids}}, {due_date: {$lt: new Date()}}]});
    },
    old_supplies() {
        var my_dishes = Dishes.find({ $and: [ {owner: Meteor.userId()}, { due_date: {$lt: new Date()}}]});

        return my_dishes;
    }
});

Template.OldDishOrdered.helpers({
    cooker(owner_id) {
        return Profiles.findOne({_id: owner_id}).employeeName;
    },
    ranked() {
        var ranked = DishesOrders.findOne({
            dish_id: Template.instance().data._id,
            client_id: Meteor.userId()}).ranked;

        return ranked;
    }
});

Template.OldDishOrdered.events({
    'click .rank'(event, instance) {

        var rank = 0;

        if($(event.target).hasClass('rank-awesome')) {
            rank = 3;
        } else if($(event.target).hasClass('rank-tasty')) {
            rank = 2;
        } else {
            rank = 1;
        }

        var ints = Template.instance();

        Profiles.update(
            ints.data.owner,
            {
                $inc: { rank: rank }
            });

        var order_id = DishesOrders.findOne({
            dish_id: ints.data._id,
            client_id: Meteor.userId()
        })._id;

        DishesOrders.update(
            order_id, {
                $set: { ranked: true }
            }
        );
    },
});


