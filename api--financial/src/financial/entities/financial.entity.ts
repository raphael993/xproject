import { Document } from "mongoose";

export class Financial {}

export interface Attatchment {
    name: '',
    description: '',
    path: ''
}

export class Transaction extends Document {
    name: string;
    description: string;
    type: string;
    value: number;
    frequency: string;
    status: string;
    providerId: string;
    walletId: string;
    attatchments: Array<Attatchment> | []
}

export class Wallet extends Document {
    name: string;
    description: string;
    total: number;
    totalWalletEnter: number;
    totalWalletLeaving: number;
}

export class Provider extends Document {
    name: string;
    description: string;
}