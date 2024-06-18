import Joi from 'joi';
const create = Joi.object({
    name: Joi.string().max(60).required(),
    tax_id: Joi.number().required().min(9999999).max(99999999),
    image: Joi.string().max(200),
    company_type: Joi.number().required().max(20), // add limits by min and max id
    phone_number: Joi.string().max(20).required(), //figure out validation of a phone number, joi-phone-number
    email: Joi.string().email().required().max(30),
    owner_id: Joi.number().required().min(1).max(99999999),
});

export default { create };
