import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Category } from 'src/categories/entities/category.entity';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  /*
  @Post()
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.entriesService.create(createEntryDto);
  }
*/
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createEntryDto: CreateEntryDto) {
    const loggedInUser = req.user;
    console.log(req.user);
    console.log('Create entry dto in controller before', createEntryDto);
    //console.log('request', req);
    //const display_url = await this.entriesService.saveImage(createEntryDto.photo.base64);
    //createEntryDto.photo = display_url; //just save the url to the image in our database.
    createEntryDto.photo = 'https://via.placeholder.com/150';
    createEntryDto.category = {
      id: Number(createEntryDto.category),
    } as Category;
    return this.entriesService.create(createEntryDto, loggedInUser);
  }
/**
Create entry dto in controller before {
  amount: 34,
  date: '2024-05-03T07:08:07.811Z',
  currency: 'DKK',
  name: 'Kdkkd',
  description: 'Kajd',
  category: '4',
  photo: { _h: 0, _i: 1, _j: null, _k: null }
}
createEntryDto {
  amount: 34,
  date: '2024-05-03T07:08:07.811Z',
  currency: 'DKK',
  name: 'Kdkkd',
  description: 'Kajd',
  category: { id: 1 },
  photo: 'https://via.placeholder.com/150',
  user: { id: 3, username: 'krishnaamen' }
}
 */
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    console.log('request from findall in controller', req.user);
    return this.entriesService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entriesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
    return this.entriesService.update(+id, updateEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entriesService.remove(+id);
  }
}
