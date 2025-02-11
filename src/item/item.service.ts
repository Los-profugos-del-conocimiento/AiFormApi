import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
    ) {}

    async create(createItemDto: CreateItemDto[]): Promise<Item[]> {
        const items = createItemDto.map(dto => this.itemRepository.create(dto));

        await this.itemRepository.save(items);

        return await Promise.all(items.map(item => this.findOne(item.id)));
    }

    async findOne(id: string, relations?: string[]): Promise<Item> {
        if (!id) throw new NotFoundException('Item ID not provided.');

        const item: Item = await this.itemRepository.findOne({ where: { id }, relations })
        if (!item) throw new NotFoundException(`Item with ID "${id}" not found.`);

        return item;
    }

    // toDo: rewrite update method
    async update(updateItemDto: UpdateItemDto[]): Promise<Item[]> {
        const items = updateItemDto.map(dto => this.itemRepository.create(dto));

        await this.itemRepository.save(items);

        return await Promise.all(items.map(async item => await this.findOne(item.id)));
    }

    async remove(id: string): Promise<void> {
        await this.itemRepository.remove(await this.findOne(id));
    }
}
