/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        /* LOCAL ATTRIBUTES */
        birthday: {
            type: 'date',
            required: true
        },
        firstName: {
            type: 'string'
        },
        isDND: {
            type: 'boolean',
            defaultsTo: false
        },
        lastName: {
            type: 'string'
        },
        phone: {
            type: 'string',
            required: true,
            unique: true
        },
        /* COLLECTIONS */
        feedbacks: {
            collection: 'feedback',
            via: 'customer'
        }
    }
};