import { GoogleFormsService } from '../google-forms/google-forms.service';
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

    async findOne(id: string, userId?: string): Promise<Form> {
        if (!id) throw new NotFoundException('Form ID not provided.');

        const form: Form = await this.formRepository.findOne({ where: { id } });
        if (!form) throw new NotFoundException(`Form with ID "${id}" not found`);
        
        if (userId && form.user.id !== userId)
            throw new ForbiddenException('You do not have permission to manage this form.');

        return form;
    }

    async update(id: string, form: Form, userId?: string): Promise<void> {
        await this.findOne(id, userId);
        await this.formRepository.save({ ...form, id });
    }

    async remove(id: string, userId?: string): Promise<Form> {
        return this.formRepository.remove(await this.findOne(id, userId));
    }
}
