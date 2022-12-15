import * as mongoose from 'mongoose';''

export const  WalletSchema = new mongoose.Schema({
    name: String,
    description: String,
    total: Number,
    totalWalletEnter: Number,
    totalWalletLeaving: Number,
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});
