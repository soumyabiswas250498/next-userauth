import mongoose, { Schema } from "mongoose";

const examSchema = new Schema({
    exam: {
        type: String,
        unique: true,
        required: true
    },
    section: {
        type: String,
        required: true,
    },
    sectionId: {
        type: Schema.Types.ObjectId,
        ref: 'Section',
    },
})

export default mongoose.models.Exam || mongoose.model('Exam', examSchema)