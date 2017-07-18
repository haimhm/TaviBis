import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../imports/ui/open_dishes.html'
import '../imports/ui/add_dish.html'
import '../imports/ui/future_dish.html'
import '../imports/ui/history_dish.html'
import '../imports/ui/best_chefs.html'

//BlazeLayout.render('mainTemplate', { main: 'bla' });

FlowRouter.route('/bla2', {
    name: 'bla2',
    action() {
        BlazeLayout.render('mainTemplate', {main: 'bla2'});
    }
});

FlowRouter.route('/', {
    name: 'bla',
    action() {
        BlazeLayout.render('mainTemplate', {main: 'bla'});
    }
});

FlowRouter.route('/open_dishes_par', {
    name: 'open dishes',
    action() {
        BlazeLayout.render('mainTemplate', {main: 'OpenDishes'});
    }
});

FlowRouter.route('/add_dish_par', {
    name: 'add dish',
    action() {
        BlazeLayout.render('mainTemplate', {main: 'AddDish'});
    }
});

FlowRouter.route('/future_dish_par', {
    name: 'future dish',
    action() {
        BlazeLayout.render('mainTemplate', {main: 'FutureDish'});
    }
});

FlowRouter.route('/user_profile_par', {
    name: 'user_profile',
    action() {
        BlazeLayout.render('mainTemplate', {main: 'UserProfile'});
    }
});

FlowRouter.route('/la_mirpeset_orders_par', {
    name: 'la_mirpeset_orders',
    action() {
        BlazeLayout.render('mainTemplate', {main: 'LaMirpesetOrders'})
    }
});

FlowRouter.route('/la_mirpeset_report_par', {
    name: 'la_mirpeset_report',
    action() {
        BlazeLayout.render('mainTemplate', {main: 'LaMirpesetReport'})
    }
});

FlowRouter.route('/la_mirpeset_admin_par', {
    name: 'la_mirpeset_admin',
    action() {
        BlazeLayout.render('mainTemplate', {main: 'LaMirpesetAdmin'})
    }
});

FlowRouter.route('/la_mirpeset_dish_par', {
    name: 'la_mirpeset_dish',
    action() {
        BlazeLayout.render('mainTemplate', {main: 'LaMirpesetDish'})
    }
});

FlowRouter.route('/history_dishes', {
    name: 'history dishes',
    action() {
        BlazeLayout.render('mainTemplate', {main: 'HistoryDish'})
    }
});

FlowRouter.route('/best_chefs_par', {
    name: 'best chefs',
    action() {
        BlazeLayout.render('mainTemplate', {main: 'BestChefs'})
    }
});


// // import { FlowRouter } from 'meteor/kadira:flow-router';
// // import { BlazeLayout } from 'meteor/kadira:blaze-layout';

//
// import '../imports/ui/body.js';
//
// // FlowRouter.route('/', {
// //     name: 'home',
// //     action() {
// //         BlazeLayout.render('HomeLayout');
// //     }
// // });
//
// FlowRouter.route('/add_dish_par', {
//     name: 'add_dish_par',
//     action() {
//         console.log('Moving to AddDish');
//         BlazeLayout.render('App_body', {main: 'AddDish'});
//     }
// });