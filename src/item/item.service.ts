import { AnswerService } from '../answer/answer.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,

        private readonly answerService: AnswerService,
    ) {}

    async create(createItemDto: CreateItemDto): Promise<Item> {
        return await this.itemRepository.save(this.itemRepository.create(createItemDto));
    }

    async createMany(createItemDtos: CreateItemDto[]): Promise<Item[]> {
        return await Promise.all(createItemDtos.map(async (createItemDto) => {
            createItemDto.answers = await this.answerService.createMany(createItemDto.answers);

            return await this.create(createItemDto);
        }));
    }

    async findAll(): Promise<Item[]> {
        return await this.itemRepository.find({ relations: ['answers'] });
    }

    async findOne(id: string): Promise<Item> {
        return await this.itemRepository.findOne({ where: { id }, relations: ['answers'] });
    }

    async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
        const item = await this.findOne(id);
        Object.assign(item, updateItemDto);

        return await this.itemRepository.save(item);
    }

    async remove(id: string): Promise<void> {
        await this.itemRepository.remove(await this.findOne(id));
    }
}
