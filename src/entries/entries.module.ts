import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { Entry } from './entities/entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Entry])],
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}
