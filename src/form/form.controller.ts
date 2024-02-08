import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortUuidPipe } from '../common/pipes/short-uuid.pipe';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @Get()
  findAll() {
    return this.formService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ShortUuidPipe) id: string) {
    return this.formService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ShortUuidPipe) id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(id, updateFormDto);
  }

  @Delete(':id')
  remove(@Param('id', ShortUuidPipe) id: string) {
    return this.formService.remove(id);
  }
}
