import { 
    Controller, Get, Post, Body, Patch, Param, Delete, 
    InternalServerErrorException
} from '@nestjs/common';
import { validateOrReject, ValidationError } from 'class-validator';
import { ShortUuidPipe } from '../common/pipes/short-uuid.pipe';
import { FormValidationPipe } from '../form/form.pipe';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { plainToInstance } from 'class-transformer';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post()
    async create(@Body(FormValidationPipe) createItemDto: CreateItemDto[]) {
        try {
            for (const item of createItemDto)
                await validateOrReject(plainToInstance(CreateItemDto, item));
            return this.itemService.create(createItemDto);
        } catch (errors) {
            if (errors instanceof Array && errors[0] instanceof ValidationError)
                throw errors[0];

            throw new InternalServerErrorException();
        }
    }

    @Patch(':id')
    update(
        @Param('id', ShortUuidPipe) id: string, 
        @Body() updateItemDto: UpdateItemDto
    ) {
        // toDo: test update item
        return this.itemService.update(id, updateItemDto);
    }

    @Delete(':id')
    remove(@Param('id', ShortUuidPipe) id: string) {
        return this.itemService.remove(id);
    }
}
