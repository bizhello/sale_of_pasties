import CardController from '@app/core/card/card.controller';
import CardService from '@app/core/card/card.service';
import { Card, cardSchema } from '@app/schemas/card.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: cardSchema }]),
  ],
  controllers: [CardController],
  providers: [CardService],
})
export default class CardModule {}
