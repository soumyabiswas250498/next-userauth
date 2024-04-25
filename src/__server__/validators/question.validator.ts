import Joi from 'joi';


const questionSchema = Joi.object({
    question: Joi.string().required(),
    option1: Joi.string().required(),
    option2: Joi.string().required(),
    option3: Joi.string().required(),
    option4: Joi.string().required(),
    explaination: Joi.string().allow(''),  // Allow empty explanation
    correctOption: Joi.number().integer().min(0).max(3).required(), // Enforce valid option index
    selectedSubject: Joi.string().required(),
    selectedTopic: Joi.string().required(),
    selectedSection: Joi.array().items(Joi.string()).required(),
    selectedExam: Joi.array().items(Joi.string()).required(),
});

export { questionSchema }