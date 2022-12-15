import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { ProvidersService } from '../../services/providers.service';
import { TransactionsService } from '../../services/transactions.service';
import { WalletsService } from '../../services/wallets.service';
import { 
    GetProviders,
    GetProvidersSuccess,
    GetTransactions,
    GetTransactionsSuccess,
    GetWallets,
    GetWalletsSuccess,
    RemoveProvider,
    RemoveProviderSuccess,
    RemoveTransaction,
    RemoveTransactionSuccess,
    RemoveWallet,
    RemoveWalletSuccess,
    SelectWallet,
    SetProvider,
    SetProviderSuccess,
    SetTransaction,
    SetTransactionSuccess,
    SetWallet,
    UpdateTransaction
} from './fianancial.actions';

export interface Provider {
    _id: string | null,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface Transaction {
    _id: string | null,
    name: string,
    description: string,
    type: string,
    value: number,
    frequency: string,
    status: string,
    providerId: string,
    walletId: string,
    attatchments: Array<any>,
    createdAt: Date,
    updatedAt: Date,
}

export interface Wallet {
    _id: string | null,
    name: String,
    description: String,
    total: Number,
    totalWalletEnter: Number,
    totalWalletLeaving: Number,
    createdAt: Date,
    updatedAt: Date,
}

export interface GeneralData {
    walletSelected: any,
    totalWalletCash: number,
    totalWalletEnter: number,
    totalWalletLeaving: number
}

export interface FinancialStateModel {
  generalData: GeneralData,
  providers: Array<Provider>,
  transactions: Array<Transaction>,
  wallets: Array<Wallet>
}



@State<FinancialStateModel>({
  name: 'financial',
  defaults: {
    generalData: { 
        walletSelected: undefined,
        totalWalletCash: 0,
        totalWalletEnter: 0,
        totalWalletLeaving: 0
    },
    providers: [],
    transactions: [],
    wallets: [],
  }
})
@Injectable()
export class FinancialState {
  constructor(
    private store: Store,
    private providersService: ProvidersService,
    private transactionsService: TransactionsService,
    private walletServices: WalletsService
) {}

    /* PROVIDERS */

    @Action(SetProvider)
    setProvider(ctx: StateContext<FinancialStateModel>, action: SetProviderSuccess) {
        this.providersService.setProvider(action.payload).subscribe(res => {
            // action de info ??
        }) 
    }

    @Action(GetProviders)
    getProviders() {
        this.providersService.getProviders().subscribe(res => {
            this.store.dispatch(new GetProvidersSuccess(res));
        }) 
    }

    @Action(GetProvidersSuccess)
    getProvidedersSuccess(ctx: StateContext<FinancialStateModel>, action: GetProvidersSuccess) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            providers: action.payload
        });
    }

    @Action(RemoveProvider)
    removeProvider(ctx: StateContext<FinancialStateModel>, action: RemoveProvider) {
            this.providersService.removeProvider(action.payload._id).subscribe(res => {
            this.store.dispatch(new RemoveProviderSuccess(action.payload));
        })
    }

    @Action(RemoveProviderSuccess)
    removeProviderSuccess(ctx: StateContext<FinancialStateModel>, action: RemoveProviderSuccess) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            providers: state.providers.filter( provider => provider._id !== action.payload._id)
        });
    }

    /* TRANSACTIONS */

    @Action(SetTransaction)
    setTransaction(ctx: StateContext<FinancialStateModel>, action: SetTransaction) {
        this.transactionsService.setTransaction(action.payload).subscribe(res => {
            this.store.dispatch( new SetTransactionSuccess(res));
        }) 
    }

    @Action(SetTransactionSuccess)
    setTransactionSuccess(ctx: StateContext<FinancialStateModel>, action: SetTransactionSuccess) {   
        const wallet = this.walletServices.getWallet(action.payload.walletId).subscribe(res => {
            this.store.dispatch( new SelectWallet(res));
        });
        this.store.dispatch( new GetTransactions({}));
    }

    @Action(GetTransactions)
    getTransactions(ctx: StateContext<FinancialStateModel>, action: GetTransactions) {
        const state = ctx.getState();
        this.transactionsService.getTransactions({ ...action.payload, walletId: state.generalData.walletSelected._id }).subscribe(res => {
            this.store.dispatch(new GetTransactionsSuccess(res));
        }) 
    }

    @Action(GetTransactionsSuccess)
    getTransactionsSuccess(ctx: StateContext<FinancialStateModel>, action: GetTransactionsSuccess) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            transactions: action.payload,
        });
    }

    @Action(UpdateTransaction)
    updateTransaction(ctx: StateContext<FinancialStateModel>, action: UpdateTransaction) {
        this.transactionsService.updateTransaction(action.payload).subscribe(res => {
            const wallet = this.walletServices.getWallet(action.payload.walletId).subscribe(res => {
                this.store.dispatch( new SelectWallet(res));
            });
            this.store.dispatch( new GetTransactions({}));
        }) 
    }

    @Action(RemoveTransaction)
    removeTransaction(ctx: StateContext<FinancialStateModel>, action: RemoveTransaction) {
            this.transactionsService.removeTransaction(action.payload._id).subscribe(res => {
            this.store.dispatch(new RemoveTransactionSuccess(action.payload));
        })
    }

    @Action(RemoveTransactionSuccess)
    removeTransactionSuccess(ctx: StateContext<FinancialStateModel>, action: RemoveTransactionSuccess) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            transactions: state.transactions.filter( transaction => transaction._id !== action.payload._id)
        });
    }

    /* WALLETS */

    @Action(SetWallet)
    setWallet(ctx: StateContext<FinancialStateModel>, action: SetWallet) {
        this.walletServices.setWallet(action.payload).subscribe(res => {
            return this.store.dispatch( new SelectWallet(res));
        }) 
    }

    @Action(SelectWallet)
    SelectWallet(ctx: StateContext<FinancialStateModel>, action: SelectWallet) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            generalData: { 
                ...state.generalData,
                walletSelected: action.payload,
            }
        });
    }

    @Action(GetWallets)
    getWallets() {
        this.walletServices.getWallets().subscribe(res => {
            this.store.dispatch(new GetWalletsSuccess(res));
        }) 
    }

    @Action(GetWalletsSuccess)
    getWalletsSuccess(ctx: StateContext<FinancialStateModel>, action: GetWalletsSuccess) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            wallets: action.payload,
            generalData: { ...state.generalData, walletSelected: state.wallets?.find( wallet => wallet._id === state.generalData.walletSelected._id) || null }
        });
    }

    @Action(RemoveWallet)
    removeWallet(ctx: StateContext<FinancialStateModel>, action: RemoveWallet) {
            this.walletServices.removeWallet(action.payload._id).subscribe(res => {
            this.store.dispatch(new RemoveWalletSuccess(action.payload));
        })
    }

    @Action(RemoveWalletSuccess)
    removeWalletSuccess(ctx: StateContext<FinancialStateModel>, action: RemoveWalletSuccess) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            wallets: state.wallets.filter( wallet => wallet._id !== action.payload._id)
        });
    }
}