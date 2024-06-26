import Joi from 'joi';
const create = Joi.object({
    type_id: Joi.number().required().min(9999999).max(99999999),
    name: Joi.string().max(60).required(),
});
