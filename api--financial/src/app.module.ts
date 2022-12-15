import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancialModule } from './financial/financial.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FinancialModule,
    MongooseModule.forRoot('mongodb+srv://raphael:root@cluster0.y9ptd.mongodb.net/Financial?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
