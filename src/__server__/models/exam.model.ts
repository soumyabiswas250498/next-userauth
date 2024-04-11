import mongoose, { Schema } from "mongoose";

const examSchema = new Schema({
    exam: {
        type: String,
        unique: true,
        required: true
    }
})

export default mongoose.models.Exam || mongoose.model('Exam', examSchema)