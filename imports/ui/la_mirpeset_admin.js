import { Template } from 'meteor/templating';

import './la_mirpeset_admin.html';

import { LmRestaurants } from '../api/la_mirpeset.js';

Template.LaMirpesetAdmin.onCreated(function laMirpesetOrdersOnCreated() {
    this.state = new ReactiveDict();
});

Template.LaMirpesetAdmin.onRendered(function() {
    $('#nextOrder').datetimepicker({viewMode: 'days',
                                    format: 'YYYY-MM-DD'});
});

Template.LaMirpesetAdmin.helpers({
    lm_restaurants() {
        return LmRestaurants.find();
    },
    lm_restaurant() {
        const instance = Template.instance();

        var rest = LmRestaurants.findOne({_id: instance.state.get('RestId')});
        if (rest) {
            $("#restStatus").val(rest.status);
            return rest;
        }
        else {
            $("#restStatus").val("none");
        }
    },
    open_date() {
        const instance = Template.instance();

        var rest = LmRestaurants.findOne({_id: instance.state.get('RestId')});
        if (rest) {
            var month = rest.next_order_date.getMonth()+1
            if (month < 10) {
                month = "0" + month;
            }
            var day = rest.next_order_date.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            return rest.next_order_date.getFullYear() + "-" + month + "-" + day;
        }
        else {
            return "";
        }
    },
    get_status() {
        const instance = Template.instance();

        var rest = LmRestaurants.findOne({_id: instance.state.get('RestId')});
        if (rest) {
            return rest.status;
        }
        else {
            return "";
        }
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

Template.LaMirpesetAdmin.events({
    'change #lmRestaurants'(event, instance) {
        event.preventDefault();
        instance.state.set('RestId', $("#lmRestaurants").val());
    },
    'click #submitNewRestaurant'(event, instance) {
        event.preventDefault();

        var rest_name = $("#NewRestaurant").val();
        if (rest_name) {
            var rest = LmRestaurants.findOne({name: rest_name});
            if (rest) {
                alert("Restaurant " + rest_name + " already exists!");
            }
            else {
                LmRestaurants.insert({
                    name: rest_name,
                    status: "close",
                    lm_dishes: [],
                    next_order_date: new Date("2017-01-01")
                });
            }
        }
    },
    'click #updateRestaurant'(event, instance) {
        event.preventDefault();

        rest_status = $("#restStatus");
        if (rest_status.val() == "none") {
            return;
        }

        LmRestaurants.update($("#lmRestaurants").val(), {$set: {
            status: $("#restStatus").val(),
            next_order_date: new Date($("#nextOrder").val())
        }});
    },
});