import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvidersService } from './services/providers.service';
import { TransactionsService } from './services/transactions.service';
import { WalletsService } from './services/wallets.service';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    CurrencyMaskModule
  ],
  providers: [
    ProvidersService,
    TransactionsService,
    WalletsService,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]
})
export class SharedModule { }
