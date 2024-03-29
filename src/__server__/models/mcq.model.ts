import mongoose, { Schema } from 'mongoose';

const mcqSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
        },
        options: {
            type: [
                {
                    type: String,
                    required: true,
                },
            ],
            required: true,
        },
        isQstnImage: {
            type: Boolean,
            default: false
        },
        isAnsImage: {
            type: Boolean,
            default: false
        },
        correct: {
            type: Number,
            required: true,
        },
        explain: {
            type: String,
        },
        subject: {
            type: String,
            ref: 'Subject',
        },
        topic: {
            type: String,
            ref: 'Topic',
        },
        section: {
            type: [String],
        },
        exam: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

export const Mcq = mongoose.model('Mcq', mcqSchema);