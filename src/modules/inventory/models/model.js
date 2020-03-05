'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var InventorySchema = new Schema({

    itemID: {
        type: String,
        required: 'Please fill a Inventory itemID',
    },
    key: {
        type: String,
        required: 'Please fill a Inventory key',
    },
    value: {
        type: String,
        required: 'Please fill a Inventory value',
    },
    sign: {
        type: String,
        required: 'Please fill a Inventory sign',
    },
    qty: {
        type: String,
        required: 'Please fill a Inventory qty',
    },


    // itemID: product,
    // option: [
    //     {
    //         name: color,
    //         value: [
    //             {
    //                 name: red,
    //                 sign: 1,
    //                 qty: 50
    //             },
    //             {
    //                 name: blue,
    //                 sign: 1,
    //                 qty: 150
    //             }
    //         ]
    //     }
    // ],

    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Inventory", InventorySchema);