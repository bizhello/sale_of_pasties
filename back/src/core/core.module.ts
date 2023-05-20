import CardModule from '@app/core/card/card.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CardModule],
  exports: [CardModule],
})
export default class CoreModule {}
