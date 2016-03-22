/**
 * FeedbackController
 *
 * @description :: Server-side logic for managing feedbacks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    saveFeedback: function (req, res) {

        // Validate input
        if (!req.body || !req.body.hasOwnProperty('customer') || !req.body.hasOwnProperty('feedback')) {
            return res.badRequest();
        } else {

            var customer = req.body.customer;
            var feedback = req.body.feedback;

            // Find or create customer
            Customer.findOrCreate({phone: customer.phone}, customer).exec(function (err, c) {

                if (err) {
                    return res.serverError();
                } else {

                    async.parallel({
                        updateCustomer: function (callback) {

                            if (c.firstName !== customer.firstName || c.lastName !== customer.lastName || ((new Date(c.birthday)).toISOString() !== (new Date(customer.birthday).toISOString()))) {

                                var updatedCustomer = {
                                    firstName: customer.firstName,
                                    lastName: customer.lastName,
                                    birthday: customer.birthday
                                };

                                Customer.update({id: c.id}, updatedCustomer).exec(function (err) {

                                    if (err) {
                                        callback(err);
                                    } else {
                                        callback(null);
                                    }

                                });

                            } else {
                                callback(null);
                            }

                        },
                        saveFeedback: function (callback) {

                            feedback.customer = c.id;

                            Feedback.create(feedback).exec(function (err) {

                                if (err) {
                                    callback(err);
                                } else {
                                    callback(null);
                                }

                            });

                        }
                    }, function (err) {
                        if (err) {
                            return res.serverError();
                        } else {
                            return res.ok();
                        }
                    });

                }

            });

        }

    }

};