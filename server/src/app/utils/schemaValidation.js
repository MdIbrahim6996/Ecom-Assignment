const Joi = require("joi");

exports.createProductSchema = Joi.object({
    name: Joi.string()
        .min(5)
        .error(
            new Error("Name is required and should be minimun of 5 characters.")
        ),
    description: Joi.string()
        .min(5)
        .error(
            new Error("Name is required and should be minimun of 5 characters.")
        ),
});
