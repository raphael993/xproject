import { Provider, Transaction, Wallet } from "./financial.state";

/* PROVIDERS */

export class SetProvider {
    static readonly type = '[PROVIDERS] set provider';
    constructor(public payload: Provider) {}
}

export class SetProviderSuccess {
    static readonly type = '[PROVIDERS] set provider success';
    constructor(public payload: Provider) {}
}

export class GetProviders {
    static readonly type = '[PROVIDERS] get all providers';
    constructor() {}
}

export class GetProvider {
    static readonly type = '[PROVIDERS] get provider';
    constructor(public payload: { _id: string }) {}
}

export class GetProvidersSuccess {
    static readonly type = '[PROVIDERS] get all providers success';
    constructor(public payload: Array<Provider>) {}
}

export class RemoveProvider {
    static readonly type = '[PROVIDERS] remove provider';
    constructor(public payload: { _id: string }) {}
}

export class RemoveProviderSuccess {
    static readonly type = '[PROVIDERS] remove provider success';
    constructor(public payload: { _id: string }) {}
}


/* TRANSACTIONS */

export class SetTransaction {
    static readonly type = '[TRANSACTIONS] set transaction';
    constructor(public payload: Transaction) {}
}

export class SetTransactionSuccess {
    static readonly type = '[TRANSACTIONS] set transaction success';
    constructor(public payload: Transaction) {}
}

export class GetTransactions {
    static readonly type = '[TRANSACTIONS] get all transactions';
    constructor(public payload: any) {}
}

export class GetTransactionsByWallet {
    static readonly type = '[TRANSACTIONS] get all transactions';
    constructor(public payload: { _id: string } | null) {}
}

export class GetTransaction {
    static readonly type = '[TRANSACTIONS] get transaction';
    constructor(public payload: { _id: string }) {}
}

export class GetTransactionsSuccess {
    static readonly type = '[TRANSACTIONS] get all transactions success';
    constructor(public payload: Array<Transaction>) {}
}

export class RemoveTransaction {
    static readonly type = '[TRANSACTIONS] remove transaction';
    constructor(public payload: { _id: string }) {}
}

export class RemoveTransactionSuccess {
    static readonly type = '[TRANSACTIONS] remove transaction success';
    constructor(public payload: { _id: string }) {}
}

export class UpdateTransaction {
    static readonly type = '[TRANSACTIONS] update transaction';
    constructor(public payload: Transaction) {}
}
/* WALLETS */

export class SelectWallet {
    static readonly type = '[WALLETS] select wallet';
    constructor(public payload: Wallet) {}
}

export class SetWallet {
    static readonly type = '[WALLETS] set wallet';
    constructor(public payload: Wallet) {}
}

export class SetWalletSuccess {
    static readonly type = '[WALLETS] set wallet success';
    constructor(public payload: Wallet) {}
}

export class GetWallets {
    static readonly type = '[WALLETS] get all wallets';
    constructor() {}
}

export class GetWallet {
    static readonly type = '[WALLETS] get wallet';
    constructor(public payload: { _id: string }) {}
}

export class GetWalletsSuccess {
    static readonly type = '[WALLETS] get wallets success';
    constructor(public payload: Array<Wallet>) {}
}

export class RemoveWallet {
    static readonly type = '[WALLETS] remove wallet';
    constructor(public payload: { _id: string }) {}
}

export class RemoveWalletSuccess {
    static readonly type = '[WALLETS] remove wallet success';
    constructor(public payload: { _id: string }) {}
}