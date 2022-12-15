import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetProviders, GetTransactions, GetWallet, GetWallets, SelectWallet, SetProvider, SetTransaction, SetWallet, UpdateTransaction } from '../shared/state/financial/fianancial.actions';
import { FinancialState, FinancialStateModel, Transaction, Wallet } from '../shared/state/financial/financial.state';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.scss']
})
export class FinancialComponent implements OnInit {

  @Select(FinancialState) financialState$: Observable<FinancialStateModel> | undefined;

  constructor(
    readonly store: Store,
    readonly formBuilder: FormBuilder
  ) { }

  providers: any;
  transactions: any;
  wallets: any;
  generalData: any;

  walletForm: any;
  transactionForm: any;
  transactionFilterForm: any;
  providerForm: any;
  
  showWalletDetails = false;
  showCreateWalletForm = false;
  showTransactionArea = false;
  showSelectWalletGroup = false;
  showCreateTransactionForm = false;
  showCreateProviderForm = false;

  alert = {
    active: false,
    message: '',
    type: ''
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.subscribeToFinancial();
    this.createForms();
    this.getWallets();
    this.getTransactions();
    this.getProviders();
    this.init();
  }

  createForms() {
    this.createWalletForm();
    this.createTransactionForm();
    this.createTransactionFilterForm();
    this.createProviderForm()
  }

  init() {

    // se nao tem carteiras 
    setTimeout(() => {
      if (this.wallets.length === 0) {
        this.showCreateWalletForm = true;
        this.pushAlert('alert-danger', 'ATENÇÃO voce ainda não possue nenhuma carteira. Antes de iniciar, preencha o formulário para criar-la.');
      } else {
        this.showSelectWalletGroup = true;
      }
    }, 2000)
  }

  subscribeToFinancial() {
    this.financialState$?.subscribe(res => {
      this.providers = res.providers;
      this.transactions = res.transactions;
      this.wallets = res.wallets;
      this.generalData = res.generalData;
    });
  }

  createWalletForm(): FormGroup {
    return this.walletForm = this.formBuilder.group({
      _id: [null],
      name: [null],
      description: [null],
      total: [0],
      totalWalletEnter: [0],
      totalWalletLeaving: [0]
    });
  }

  createTransactionForm(): FormGroup {
    return this.transactionForm = this.formBuilder.group({
      _id: [null],
      name: [null],
      description: [null],
      type: [null],
      value: [null],
      frequency: [null],
      status: [null],
      providerId: [null],
      walletId: [null],
      attatchments: [[]],
    });
  }

  createTransactionFilterForm(): FormGroup {
    return this.transactionFilterForm = this.formBuilder.group({
      name: [null],
      description: [null],
      type: [null],
      value: [null],
      frequency: [null],
      status: [null],
      providerId: [null],
      walletId: [null]
    });
  }

  createProviderForm() {
    return this.providerForm = this.formBuilder.group({
      name: [null],
      description: [null]
    });
  }

  getTransactions(filter = {}) {
    this.store.dispatch(new GetTransactions(filter));
  }

  getProviders() {
    this.store.dispatch(new GetProviders());
  }

  getWallets() {
    this.store.dispatch(new GetWallets());
  }

  onNewTransaction() {
    this.transactionForm.value.walletId = this.generalData.walletSelected; 
    this.store.dispatch(new SetTransaction(this.transactionForm.value));
    this.pushAlert('alert-success', 'Transação registrada com sucesso!');
  }

  onUpdateStatus(updatedTransaction: Transaction) {
    this.store.dispatch(new UpdateTransaction(updatedTransaction));
  }

  pushAlert(type: string, message: string) {
    this.alert.message = message;
    this.alert.type = type;
    this.alert.active = true;
    const timeToshow = 2000;
    setTimeout(() => {
      this.alert.active = false;
      this.alert.message = '';
      this.alert.type = '';
    }, timeToshow)
  }

  onFilterTransaction() {
    this.getTransactions(this.transactionFilterForm.value);
  }

  onResetFilter() {
    this.transactionFilterForm.reset();
  }

  onSubmitWalletForm() {
    this.store.dispatch( new SetWallet(this.walletForm.value))
    this.pushAlert('alert-success', 'Carteira criada com sucesso!');
    this.getWallets();
    this.showCreateWalletForm = false;
    this.showTransactionArea = true;
  }

  onSubmitProviderForm() {
    this.store.dispatch( new SetProvider(this.providerForm.value))
    this.pushAlert('alert-success', 'Fornecedor criado com sucesso!');
    this.getProviders();
    this.showCreateProviderForm = false;
  }

  toggleShowWalletPainel() {
    this.showWalletDetails = !this.showWalletDetails;
  }

  onSelectWallet(index: any) {
    this.store.dispatch( new SelectWallet(this.wallets[index]));
    this.getTransactions();
    this.showTransactionArea = true;
    this.showSelectWalletGroup = false;
  }

  createWallet() {
    this.showCreateWalletForm = true;
    this.showSelectWalletGroup = false;
  }

  createProvider() {
    this.showCreateProviderForm = true;
  }

  onCancelWalletForm() {
    if (this.wallets.length < 1) {
      return this.pushAlert('alert-danger', 'ATENÇÃO voce ainda não possue nenhuma carteira. Antes de iniciar, preencha o formulário para criar-la.');
    }
    this.showCreateWalletForm = false;
  }

  onCancelProviderForm() {
    this.showCreateProviderForm = false;
  }

  loggout() {
    this.showTransactionArea = false;
    this.showCreateWalletForm = false;
    this.showSelectWalletGroup = true;
  }

}
