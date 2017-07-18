import { Mongo } from 'meteor/mongo';

export const LmRestaurants = new Mongo.Collection('lm_restaurants');
export const LmOrders = new Mongo.Collection('lm_orders');
