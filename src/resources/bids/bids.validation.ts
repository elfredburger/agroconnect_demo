import exp from 'constants';
import Joi from 'joi';
const create = Joi.object({
    user_id: Joi.number().required().min(1).max(99999999),
    company_id: Joi.number().required().min(1).max(99999999),
    lot_id: Joi.number().required().min(1).max(99999999),
    amount: Joi.number().required().min(1).max(99999999),
});
export default { create };
