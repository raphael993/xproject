import { Attatchment } from "../entities/financial.entity";

export class CreateTransactionDto {
    name: string;
    description: string;
    type: string;
    value: number;
    frequency: string;
    status: string;
    providerId: string;
    walletId: string;
    attatchments: Array<Attatchment> | [];
}
