import mongoose, { Schema } from 'mongoose';

const subjectSchema = new Schema({
    subject: {
        type: String,
        unique: true,
        required: true,
    },
});

export default mongoose.models.Subject ?? mongoose.model('Subject', subjectSchema);