/**
 * Feedback.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        /* LOCAL ATTRIBUTES */
        isSatisfied: {
            type: 'boolean',
            defaultsTo: true
        },
        message: {
            type: 'text'
        },
        /* FOREIGN ATTRIBUTES */
        customer: {
            model: 'customer',
            required: true
        }
    }
};