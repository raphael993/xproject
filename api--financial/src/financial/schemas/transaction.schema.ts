import * as mongoose from 'mongoose';import { Attatchment } from '../entities/financial.entity';
''

export const  TransactionSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String,
    value: Number,
    frequency: String,
    status: String,
    providerId: String,
    walletId: String,
    attatchments: Array<Attatchment>,
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});
