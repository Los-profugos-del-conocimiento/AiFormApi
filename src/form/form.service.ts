import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
  ) {}

  async create(createFormDto: CreateFormDto): Promise<Form> {
    const newForm = this.formRepository.create(createFormDto);
    return await this.formRepository.save(newForm);
  }

  async findAll(): Promise<Form[]> {
    return await this.formRepository.find();
  }

  async findOne(id: string): Promise<Form> {
    const form = await this.formRepository.findOne({ where: { id } });
    
    if (!form) throw new NotFoundException(`Form with ID ${id} not found`);
    
    return form;
  }

  async update(id: string, updateFormDto: UpdateFormDto): Promise<Form> {
    const form = await this.findOne(id);
    Object.assign(form, updateFormDto);

    return await this.formRepository.save(form);
  }

  async remove(id: string): Promise<void> {
    const form = await this.findOne(id);

    await this.formRepository.remove(form);
  }
}
