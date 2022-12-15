import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Wallet } from 'src/app/shared/state/financial/financial.state';

@Component({
  selector: 'app-select-wallet-group',
  templateUrl: './select-wallet-group.component.html',
  styleUrls: ['./select-wallet-group.component.scss']
})
export class SelectWalletGroupComponent implements OnInit {

  @Input() wallets: Array<Wallet> = [];
  @Output() selectWallet = new EventEmitter;
  @Output() createWallet = new EventEmitter;

  ngOnInit(): void {
  }

  onSelectWallet(index: any) {
    this.selectWallet.emit(index);
  }

  onCreateWallet() {
    this.createWallet.emit();
  }

}
