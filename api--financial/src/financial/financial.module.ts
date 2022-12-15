import { Module } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { FinancialController } from './financial.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './schemas/transaction.schema';
import { WalletSchema } from './schemas/wallet.schema';
import { ProviderSchema } from './schemas/provider.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Transaction', schema: TransactionSchema, collection: 'Transaction' },
    { name: 'Wallet', schema: WalletSchema, collection: 'Wallet' },
    { name: 'Provider', schema: ProviderSchema, collection: 'Provider' }
  ])],
  controllers: [FinancialController],
  providers: [FinancialService]
})
export class FinancialModule {}
