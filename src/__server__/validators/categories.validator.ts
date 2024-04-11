
import Joi from 'joi';


const categorySchema = Joi.string().valid('subject', 'topic', 'section', 'exam').required();

const updateCategorySchema = Joi.object().keys({
    id: Joi.string().required(),
    type: Joi.string().valid('subject', 'topic', 'section', 'exam').required(),
    newLabel: Joi.string().required(),
})

const createCategorySchema = Joi.object().keys({
    type: Joi.string().valid('subject', 'topic', 'section', 'exam').required(),
    label: Joi.string().required(),
    subject: Joi.when('type', {
        is: 'topic',
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
    })
})

const deleteCategoryValidator = Joi.object().keys({
    type: Joi.string().valid('subject', 'topic', 'section', 'exam').required(),
    id: Joi.string().required()
})



export { categorySchema, updateCategorySchema, createCategorySchema, deleteCategoryValidator };