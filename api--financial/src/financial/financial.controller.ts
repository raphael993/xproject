import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  // TRANSACTION

  @Post('transaction')
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.financialService.createTransaction(createTransactionDto);
  }

  @Get('transaction')
  findAll(@Query() query) {
    return this.financialService.findAllTransactions(query);
  }

  @Get('transaction/:id')
  findOne(@Param('id') id: string) {
    return this.financialService.findOneTransaction(+id);
  }

  @Put('transaction/:id')
  update(@Param('id') id: number, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.financialService.updateTransaction(id, updateTransactionDto);
  }

  @Delete('transaction/:id')
  remove(@Param('id') id: string) {
    return this.financialService.removeTransaction(+id);
  }

  // WALLET

  @Post('wallet')
  createWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.financialService.createWallet(createWalletDto);
  }

  @Get('wallet')
  findAllWallets() {
    return this.financialService.findAllWallets();
  }

  @Get('wallet/:id')
  findOneWallet(@Param('id') id: string) {
    return this.financialService.findOneWallet(+id);
  }

  @Put('wallet/:id')
  updateWallet(@Param('id') id: number, @Body() updateWalletDto: UpdateWalletDto) {
    return this.financialService.updateWallet(id, updateWalletDto);
  }

  @Delete('provider/:id')
  removeWallet(@Param('id') id: string) {
    return this.financialService.removeWallet(+id);
  }

  // PROVIDER

  @Post('provider')
  createProvider(@Body() createProviderDto: CreateProviderDto) {
    return this.financialService.createProvider(createProviderDto);
  }

  @Get('provider')
  findAllProviders() {
    return this.financialService.findAllProviders();
  }

  @Get('provider/:id')
  findOneProvider(@Param('id') id: string) {
    return this.financialService.findOneProvider(+id);
  }

  @Put('provider/:id')
  updateProvider(@Param('id') id: number, @Body() updateProviderDto: UpdateProviderDto) {
    return this.financialService.updateProvider(id, updateProviderDto);
  }

  @Delete('provider/:id')
  removeProvider(@Param('id') id: string) {
    return this.financialService.removeProvider(+id);
  }
}
