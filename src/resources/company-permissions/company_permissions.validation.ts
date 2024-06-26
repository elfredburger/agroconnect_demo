import Joi from 'joi';
const create = Joi.object({
    name: Joi.string().max(60).required(),

    bit: Joi.number().required().min(1).max(99999999),
});
