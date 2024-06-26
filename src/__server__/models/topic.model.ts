import mongoose, { Schema } from 'mongoose';

const topicSchema = new Schema({
    topic: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
    },
});

export default mongoose.models.Topic ?? mongoose.model('Topic', topicSchema);