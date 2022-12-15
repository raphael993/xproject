import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Provider, Transaction, Wallet } from 'src/app/shared/state/financial/financial.state';
import * as moment from 'moment';
moment.locale('pt-br');

@Component({
  selector: 'app-transaction-area',
  templateUrl: './transaction-area.component.html',
  styleUrls: ['./transaction-area.component.scss']
})
export class TransactionAreaComponent implements OnInit {

  showNewTransactionForm = false;

  @Input() transactions: Array<Transaction> = [];
  @Input() transactionForm: any;
  @Input() providers: Array<Provider> = [];
  @Input() transactionFilterForm: any;

  @Output() newTransaction = new EventEmitter();
  @Output() updateStatus = new EventEmitter();
  @Output() filterTransaction = new EventEmitter();
  @Output() resetFilter = new EventEmitter();

  ngOnInit(): void {
  }

  onNewTransaction() {
    this.showNewTransactionForm = true;
  }

  getStatusClass(status: string) {
    if (status === 'pending') return 'bi bi-clock text-warning';
    if (status === 'done') return 'bi bi-check2-circle';
    return '';
  }

  getDateTime(date: Date) {
    return moment(date).format('lll')
  }

  getProvider(_id: string) {
    return this.providers.find( provider => provider._id === _id)?.name;
  }

  onSubmitTransactionForm() {
    this.newTransaction.emit();
    this.showNewTransactionForm = false;
  }

  onUpdateStatus(index: number, status: string) {
    const transactionObject = { ...this.transactions[index], status }
    this.updateStatus.emit(transactionObject)
  }

  onFilter() {
    this.filterTransaction.emit();
  }

  onResetFilter() {
    this.resetFilter.emit();
  }

  onCancel() {
    this.showNewTransactionForm = false;
  }

}
