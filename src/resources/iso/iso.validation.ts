import Joi from 'joi';
const create = Joi.object({
    name: Joi.string().max(60).required(),

    code: Joi.string().max(60).required(),
});
