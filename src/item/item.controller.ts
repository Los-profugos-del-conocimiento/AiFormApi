import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortUuidPipe } from '../common/pipes/short-uuid.pipe';
import { CreateItemsDto, UpdateItemsDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post()
    async create(@Body() CreateItemsDto: CreateItemsDto) {
        return await this.itemService.create(CreateItemsDto.items)
    }

    @Patch()
    update(@Body() updateItemsDto: UpdateItemsDto) {
        return this.itemService.update(updateItemsDto.items);
    }

    @Delete(':id')
    remove(@Param('id', ShortUuidPipe) id: string) {
        return this.itemService.remove(id);
    }
}
