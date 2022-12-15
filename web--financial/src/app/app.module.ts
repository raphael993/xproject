import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FinancialState } from './shared/state/financial/financial.state';
import { FinancialComponent } from './financial/financial.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WalletFormComponent } from './financial/components/wallet/wallet-form/wallet-form.component';
import { TransactionAreaComponent } from './financial/components/transaction/transaction-area/transaction-area.component';
import { WalletPainelComponent } from './financial/components/wallet/wallet-painel/wallet-painel.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { SelectWalletGroupComponent } from './financial/components/wallet/select-wallet-group/select-wallet-group.component';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ProviderFormComponent } from './financial/components/provider/provider-form/provider-form.component';
import { ReportsChartsComponent } from './financial/components/reports/reports-charts/reports-charts.component';
import { NgChartsModule } from 'ng2-charts';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    FinancialComponent,
    WalletFormComponent,
    TransactionAreaComponent,
    WalletPainelComponent,
    FooterComponent,
    MainComponent,
    SelectWalletGroupComponent,
    ProviderFormComponent,
    ReportsChartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    SharedModule,
    NgxsModule.forRoot([FinancialState], {
      developmentMode: !environment.production
    }),
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
