import Joi from 'joi';
const create = Joi.object({
    product_sorts_id: Joi.string().max(60).required(),
    product_regions_id: Joi.number().required().min(9999999).max(99999999),
    product_countries_id: Joi.number().required().min(9999999).max(99999999),
    dstu_standrat_id: Joi.number().required().min(9999999).max(99999999),
    iso_standart_id: Joi.number().required().min(9999999).max(99999999),
    name: Joi.string().max(60).required(),
    moisture: Joi.number().required().min(9999999).max(99999999),
    damage: Joi.number().required().min(9999999).max(99999999),
    dirt: Joi.number().required().min(9999999).max(99999999),
    undersize: Joi.number().required().min(9999999).max(99999999),
});

export default { create };
