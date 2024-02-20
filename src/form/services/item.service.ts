import { InjectRepository } from '@nestjs/typeorm';
import { AnswerService } from './answer.service';
import { Item } from '../entities/item.entity';
import { Injectable } from '@nestjs/common';
import { ItemDto } from '../dto/item.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,

        private readonly answerService: AnswerService,
    ) {}

    async create(createItemDto: ItemDto): Promise<Item> {
        return await this.itemRepository.save(this.itemRepository.create(createItemDto));
    }

    async createMany(createItemDtos: ItemDto[]): Promise<Item[]> {
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

    async update(id: string, updateItemDto: ItemDto): Promise<Item> {
        const item = await this.findOne(id);
        Object.assign(item, updateItemDto);

        return await this.itemRepository.save(item);
    }

    async remove(id: string): Promise<void> {
        await this.itemRepository.remove(await this.findOne(id));
    }
}
