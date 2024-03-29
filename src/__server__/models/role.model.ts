import mongoose, { Schema } from 'mongoose';

const roleSchema = new Schema({
    permission: {
        type: String,
        enum: ['admin', 'author', 'editor', 'user'],
    },
});

export const Role = mongoose.model('Role', roleSchema);