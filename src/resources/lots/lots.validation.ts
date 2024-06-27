import Joi from 'joi';
const create = Joi.object({
    name: Joi.string().max(60).required(),
    company_id: Joi.number().required().min(9999999).max(99999999),
    product_id: Joi.number().required().min(9999999).max(99999999),
    weight: Joi.number().required().min(9999999).max(99999999),
    description: Joi.string().max(500),
    status_id: Joi.number().required().min(9999999).max(99999999),
    measure_unit_id: Joi.number().required().min(9999999).max(99999999),
    creator_id: Joi.number().required().min(9999999).max(99999999),
    incoterm_id: Joi.number().required().min(9999999).max(99999999),
    packaging: Joi.string().max(255),
});

export default { create };
