import mongoose, { Schema } from 'mongoose';

const sectionSchema = new Schema({
    section: {
        type: String,
        unique: true,
        required: true,
    },
});

export const Section = mongoose.model('Section', sectionSchema)