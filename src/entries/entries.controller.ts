import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  /*
  @Post()
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.entriesService.create(createEntryDto);
  }
*/

  @Post()
  async create(@Request() req, @Body() createEntryDto: CreateEntryDto) {
    const loggedInUser = req.user;
    console.log('logged in user', loggedInUser);

    const display_url = await this.entriesService.saveImage(
      createEntryDto.photo.base64,
    );
    createEntryDto.photo = display_url; //just save the url to the image in our database.

    return this.entriesService.create(createEntryDto, loggedInUser);
  }

  @Get()
  findAll() {
    return this.entriesService.findAll();
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
