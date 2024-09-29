const Joi = require('joi');

 module.exports.adventureplaceSchema = Joi.object({
    adventureplace: Joi.object({
       title: Joi.string().required(),
       price: Joi.number().required().min(0),
       image: Joi.string().required(),
       location: Joi.string().required(),
       description: Joi.string().required()
    }).required()
 });