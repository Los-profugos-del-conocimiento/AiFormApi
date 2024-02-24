import { GoogleFormsService } from '../google-forms/google-forms.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormService {
    constructor(
        @InjectRepository(Form)
        private readonly formRepository: Repository<Form>,
    ) {}

    async create(form: Form): Promise<Form> {
        return await this.formRepository.save(this.formRepository.create(form));
    }

    async findAll(): Promise<Form[]> {
        return await this.formRepository.find({ relations: ['items', 'items.answers'] });
    }

    async findOne(id: string): Promise<Form> {
        const form: Form = await this.formRepository.findOne({ 
            where: { id },
            relations: ['items', 'items.answers']
        });
        
        if (!form) throw new NotFoundException(`Form with ID ${id} not found`);
        
        return form;
    }

    async update(id: string, form: Form): Promise<Form> {
        return form;
    }

    async remove(id: string): Promise<void> {
        await this.formRepository.remove(await this.findOne(id));
    }
}
