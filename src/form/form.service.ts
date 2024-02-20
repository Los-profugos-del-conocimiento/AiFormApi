import { GoogleFormsService } from '../google-forms/google-forms.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { ItemService } from '../item/item.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormService {
    constructor(
        @InjectRepository(Form)
        private readonly formRepository: Repository<Form>,

        private readonly itemService: ItemService,
    ) {}

    async create(createFormDto: CreateFormDto): Promise<Form> {
        createFormDto.items = await this.itemService.createMany(createFormDto.items);

        return await this.formRepository.save(this.formRepository.create(createFormDto));
    }

    async findAll(): Promise<Form[]> {
        return await this.formRepository.find({ relations: ['items', 'items.answers'] });
    }

    async findOne(id: string): Promise<Form> {
        const form = await this.formRepository.findOne({ 
            where: { id },
            relations: ['items', 'items.answers']
        });
        
        if (!form) throw new NotFoundException(`Form with ID ${id} not found`);
        
        return form;
    }

    async update(id: string, updateFormDto: UpdateFormDto): Promise<Form> {
        const form = await this.findOne(id);
        Object.assign(form, updateFormDto);

        return await this.formRepository.save(form);
    }

    async remove(id: string): Promise<void> {
        await this.formRepository.remove(await this.findOne(id));
    }
}
