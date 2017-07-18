import { Template } from 'meteor/templating';
import './add_dish.html';
import './upload_form.html';

import { Dishes } from '../api/dishes.js';

Template.AddDish.onRendered(function() {
    console.log('Add Dish rendered');
    this.$('.datepicker-cls').datetimepicker( { date: new Date(),
        viewMode: 'days',
        format: 'YYYY-MM-DD'} );
    this.$('.for-chosen').chosen({'width' : '500px'});
    this.$('#priceOptions').chosen({'width' : '250px'});
});

Template.AddDish.events({
    'submit #add-dish-form'(event, instance) {
        event.preventDefault();

        Dishes.insert({
            "name": $('#dishName').val(),
            "description": $('#dishDescription').val(),
            "due_date":  new Date($('#dueDate').val()),
            "owner": Meteor.userId(),
            "price": $('#priceOptions').val(),
            "amount": parseInt($('#dishAmount').val()),
            "unorder_amount":  parseInt($('#dishAmount').val()),
            "tags": $("#labelsOptions").val()
        });

        $('#labelsOptions>option:selected').removeAttr('selected');
        $('#labelsOptions').chosen("destroy").chosen();

        $('#add-dish-form')[0].reset();
    },
});



