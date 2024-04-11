
import Joi from 'joi';


const categorySchema = Joi.string().valid('subject', 'topic', 'section', 'exam');

const updateCategorySchema = Joi.object().keys({
    id: Joi.string().required(),
    type: Joi.string().valid('subject', 'topic', 'section', 'exam'),
    newLabel: Joi.string().required(),
})

const createCategorySchema = Joi.object().keys({
    type: Joi.string().valid('subject', 'topic', 'section', 'exam'),
    label: Joi.string().required(),
    subject: Joi.when('type', {
        is: 'topic',
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
    })
})

export { categorySchema, updateCategorySchema, createCategorySchema };