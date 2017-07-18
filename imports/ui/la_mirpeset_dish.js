import { Template } from 'meteor/templating';

import './la_mirpeset_dish.html';

import { LmRestaurants } from '../api/la_mirpeset.js';

Template.LaMirpesetDish.onCreated(function laMirpesetOrdersOnCreated() {
    this.state = new ReactiveDict();
    Random.createWithSeeds(0);
});

Template.LaMirpesetDish.helpers({
    lm_restaurants() {
        return LmRestaurants.find();
    },
    lm_restaurant() {
        const instance = Template.instance();

        var rest = LmRestaurants.findOne({_id: instance.state.get('RestId')});
        if (rest) {
            return rest;
        }
    },
});

Template.LaMirpesetDish.events({
    'change #lmRestaurants'(event, instance) {
        event.preventDefault();
        instance.state.set('RestId', $("#lmRestaurants").val());
    },
    'click #addDish'(event, instance) {
        event.preventDefault();

        LmRestaurants.update($("#lmRestaurants").val(), {
            $push: {
                lm_dishes: {
                    _id: Random.id(),
                    name: $("#dishName").val(),
                    desc: $("#dishDesc").val(),
                    price: $("#dishPrice").val(),
                    final_price: $("#dishFinalPrice").val()
                }
            }
        });
    },
});