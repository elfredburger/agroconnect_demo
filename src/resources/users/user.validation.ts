import Joi from 'joi';

const update = Joi.object({
    first_name: Joi.string().max(60),
    last_name: Joi.string().max(60),
    subscription_id: Joi.number().min(9999999).max(99999999),
    email: Joi.string().email(),
    password: Joi.string().max(60),
    token: Joi.string().max(60),
    phone: Joi.string().max(20),
});
const create = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(60).required(),
});
const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(60).required(),
});
export default { update, create, login };
