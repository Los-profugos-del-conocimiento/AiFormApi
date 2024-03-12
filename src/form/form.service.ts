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

    create(form: Form): Promise<Form> {
        return this.formRepository.save(this.formRepository.create(form));
    }

    findByUser(userId: string): Promise<Form[]> {
        return this.formRepository.find({ where: { user: { id: userId } } });
    }

    async findOne(id: string): Promise<Form> {
        const form: Form = await this.formRepository.findOne({ where: { id } });
        
        if (!form) throw new NotFoundException(`Form with ID ${id} not found`);
        
        return form;
    }

    async update(id: string, form: Form): Promise<void> {
        await this.findOne(id);
        await this.formRepository.save({ ...form, id });
    }

    async remove(id: string): Promise<Form> {
        return this.formRepository.remove(await this.findOne(id));
    }
}
