import * as mongoose from 'mongoose';''

export const  ProviderSchema = new mongoose.Schema({
    name: String,
    description: String,
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});
