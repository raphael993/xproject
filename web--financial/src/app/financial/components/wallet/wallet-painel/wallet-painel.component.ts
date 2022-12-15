import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FinancialState, FinancialStateModel, GeneralData, Wallet } from 'src/app/shared/state/financial/financial.state';

@Component({
  selector: 'app-wallet-painel',
  templateUrl: './wallet-painel.component.html',
  styleUrls: ['./wallet-painel.component.scss']
})
export class WalletPainelComponent implements OnInit {
  @Input() showWalletDetails = false;
  
  walletName: any;
  generalData: any;
  wallets: Array<Wallet> = [];

  constructor(
    readonly store: Store,
  ) { }

  @Select(FinancialState) financialState$: Observable<FinancialStateModel> | undefined;

  showCurrencyData = false;


  ngOnInit(): void {
    this.subscribeToFinancial();
  }

  subscribeToFinancial() {
    this.financialState$?.subscribe(res => {
      this.wallets = res.wallets;
      this.generalData = res.generalData;
    });
  }

  toggleShowCurrencyData() {
    // this.showCurrencyData = !this.showCurrencyData;
  }

}
