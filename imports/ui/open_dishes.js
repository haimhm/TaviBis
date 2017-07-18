import { Template } from 'meteor/templating';

import './open_dishes.html';

import { Dishes } from '../api/dishes.js';
import { Profiles } from '../api/profiles.js';


Template.OpenDishes.onRendered(function() {
    console.log('Open Dish rendered');
    this.$('#requiredDate').datetimepicker( { date: new Date(),
                                                viewMode: 'days',
                                                format: 'YYYY-MM-DD'} );
    //this.$('#labelsOptions').chosen({'width' : '250px',  allow_single_deselect:true});
});

Template.OpenDishes.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    this.state.set('DueDate', new Date());
});

Template.OpenDishes.helpers({
    dishes() {
        const instance = Template.instance();

        //return Dishes.find({ $and: [ { unorder_amount: { $gt: 0 } }, { due_date: {$gte: instance.state.get('DueDate') } } ] });
        var dishes = Dishes.find({ due_date: {$gte: instance.state.get('DueDate') }});

        var filtered_dishes = [];

        if (instance.state.get('cooker')) {

            dishes.forEach(function(item){

                    if(item.owner == instance.state.get('cooker')) {
                        filtered_dishes.push(item);
                    }

            });
        } else {
            filtered_dishes = dishes;
        }

        var filtered_dishes2 = [];

        if (instance.state.get('tag')) {

            var tag = instance.state.get('tag');
            filtered_dishes.forEach(function(item){

                if($.inArray(tag, item.tags) != -1) {
                    filtered_dishes2.push(item);
                }
            });
        } else {
            filtered_dishes2 = filtered_dishes;
        }

        return filtered_dishes2;
    },
    cookers() {
        var all_cookers = Dishes.find({ due_date: {$gte: Template.instance().state.get('DueDate') }}, { owner: 1, _id: 0});

        var cookers_ids = [];

        all_cookers.forEach(function(item){
            cookers_ids.push(item.owner);
        });

        var cookers_profiles = Profiles.find({_id: { $in: cookers_ids }});

        var cookers_names = [];

        cookers_profiles.forEach(function(item){
            cookers_names.push([item.employeeName]);
        });

       return (cookers_names);
    }
});

Template.OpenDishes.events({
    'click #submit_dishes_filter'(event, instance) {
        event.preventDefault();
        instance.state.set('DueDate', new Date($('#requiredDate').val()));

        var cooker_filter =  $('#cooker-filter').val();

        if(cooker_filter) {
            instance.state.set('cooker',  Profiles.findOne({employeeName: cooker_filter })._id);
        } else {
            instance.state.set('cooker', false);
        }

        var label_filter = $('#labelsOptions').val();

        if(label_filter != 'None') {
            instance.state.set('tag', label_filter);
        } else {
            instance.state.set('tag', false);
        }
    },
});