import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusTransaction } from './constants/status-transaction.enum';
import { TypeTransaction } from './constants/type-transaction.enum';
import { CreateProviderDto } from './dto/create-provider.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Transaction, Wallet } from './entities/financial.entity';

@Injectable()
export class FinancialService {

  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<Transaction>,
    @InjectModel('Wallet')
    private walletModel: Model<Wallet>,
    @InjectModel('Provider')
    private providerModel: Model<Provider>,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto) {

    try {
      const wallet = await this.findOneWallet(createTransactionDto.walletId);

      if (createTransactionDto.status === StatusTransaction.DONE) {
        if (createTransactionDto.type === TypeTransaction.INTERNAL) {
          await this.updateWallet(wallet._id, { ...wallet.toObject(),  totalWalletEnter: (wallet.totalWalletEnter +  createTransactionDto.value), total: (wallet.total + createTransactionDto.value) });
        }
        if (createTransactionDto.type === TypeTransaction.EXTERNAL) {
          await this.updateWallet(Number(wallet._id), { ...wallet.toObject(),  totalWalletLeaving: wallet.totalWalletLeaving +  createTransactionDto.value, total: wallet.total - createTransactionDto.value });
        }
      }
  } catch(err) {
    console.log('Erro ao recuperar carteira', err)
  }

    return this.transactionModel.insertMany([createTransactionDto]);
  }

  findAllTransactions(query: any) {
    return this.transactionModel.find(query);
  }

  findOneTransaction(id: number) {
    return this.transactionModel.findOne({ id });
  }

  async updateTransaction(_id: number, updateTransactionDto: UpdateTransactionDto) {
    let wallet;

    try {
      wallet = await this.findOneWallet(Number(updateTransactionDto.walletId));
    
      if (updateTransactionDto.status === StatusTransaction.DONE) {
        if (updateTransactionDto.type === TypeTransaction.INTERNAL) {
          await this.updateWallet(Number(wallet._id), { ...wallet.toObject(),  totalWalletEnter: wallet.totalWalletEnter +  updateTransactionDto.value, total: wallet.total + updateTransactionDto.value });
        }
        if (updateTransactionDto.type === TypeTransaction.EXTERNAL) {
          await this.updateWallet(Number(wallet._id), { ...wallet.toObject(),  totalWalletLeaving: wallet.totalWalletLeaving +  updateTransactionDto.value, total: wallet.total - updateTransactionDto.value });
        }
      }
  } catch(err) {
    return console.log(err);
  }
    return this.transactionModel.updateOne({_id}, updateTransactionDto)
  }

  removeTransaction(id: number) {
    return this.transactionModel.deleteOne({ id });
  }


  createWallet(createWalletDto: CreateWalletDto) {
    createWalletDto = { ...createWalletDto, totalWalletEnter: createWalletDto.total }
    return this.walletModel.insertMany([createWalletDto]);
  }

  findAllWallets() {
    return this.walletModel.find();
  }

  findOneWallet(id: any) {
    return this.walletModel.findOne({ id });
  }

  updateWallet(id: number, updateWalletDto: UpdateWalletDto) {
    return this.walletModel.updateOne({id}, updateWalletDto)
  }

  removeWallet(id: number) {
    return this.walletModel.deleteOne({ id });
  }


  createProvider(createProviderDto: CreateProviderDto) {
    return this.providerModel.insertMany([createProviderDto]);
  }

  findAllProviders() {
    return this.providerModel.find();
  }

  findOneProvider(id: number) {
    return this.providerModel.findOne({ id });
  }

  updateProvider(id: number, updateProviderDto: UpdateProviderDto) {
    return this.providerModel.updateOne({id}, updateProviderDto)
  }

  removeProvider(id: number) {
    return this.providerModel.deleteOne({ id });
  }
}
