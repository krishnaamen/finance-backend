import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Repository } from 'typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
    private httpService: HttpService,
  ) {}

  async saveImage(base64EncodedImage: string): Promise<string> {
    const formData = new FormData();
    formData.append('image', base64EncodedImage);
    const { data: imageData } = await firstValueFrom(
      this.httpService
        .post(
          `https://freeimage.host/api/1/upload?key=${process.env.IMG_API_KEY}`,
          formData,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log('error!!!!!');
            throw error;
          }),
        ),
    );
    return imageData.image.display_url;
  }

  create(createEntryDto: CreateEntryDto, user: User) {
    createEntryDto.user = user;
    return this.entryRepository.save(createEntryDto);
  }

  findAll() {
    return this.entryRepository.find();
  }

  findOne(id: number) {
    return this.entryRepository.findOneBy({ id });
  }

  async update(id: number, updateEntryDto: UpdateEntryDto) {
    console.log('updateEntryDto', updateEntryDto);
    const test = await this.findOne(id);
    const categoryid =
      updateEntryDto.category != null ? updateEntryDto.category : test.category;
    updateEntryDto.category = categoryid;
    await this.entryRepository.update(id, updateEntryDto);
    const test1 = await this.findOne(id);
    console.log(test);
    return test1;
  }

  remove(id: number) {
    return this.entryRepository.delete(id);
  }
}
