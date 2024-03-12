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
        return await Promise.all(createItemDto.map(async (createItem) =>
            await this.itemRepository.save(this.itemRepository.create(createItem))
        ));
    }

    async findAll(): Promise<Item[]> {
        return await this.itemRepository.find();
    }

    async findOne(id: string): Promise<Item> {
        const item: Item = await this.itemRepository.findOne({ where: { id } });
        
        if (!item) throw new NotFoundException(`Item with ID ${id} not found`);

        return item;
    }

    // toDo: rewrite update method
    async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
        const item = await this.findOne(id);
        Object.assign(item, updateItemDto);

        return await this.itemRepository.save(item);
    }

    async remove(id: string): Promise<void> {
        await this.itemRepository.remove(await this.findOne(id));
    }
}
