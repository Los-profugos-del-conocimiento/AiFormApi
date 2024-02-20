import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortUuidPipe } from '../common/pipes/short-uuid.pipe';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post()
    create(@Body() createItemDto: CreateItemDto) {
        return this.itemService.create(createItemDto);
    }

    @Get()
    findAll() {
        return this.itemService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ShortUuidPipe) id: string) {
        return this.itemService.findOne(id);
    }

    @Patch(':id')
    update(
      @Param('id', ShortUuidPipe) id: string, 
      @Body() updateItemDto: UpdateItemDto
    ) {
        return this.itemService.update(id, updateItemDto);
    }

    @Delete(':id')
    remove(@Param('id', ShortUuidPipe) id: string) {
        return this.itemService.remove(id);
    }
}
