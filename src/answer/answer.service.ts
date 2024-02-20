import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private readonly answerRepository: Repository<Answer>,
    ) {}

    async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
        return await this.answerRepository.save(this.answerRepository.create(createAnswerDto));
    }

    async createMany(createAnswerDtos: CreateAnswerDto[]): Promise<Answer[]> {
        return await this.answerRepository.save(this.answerRepository.create(createAnswerDtos));
    }

    async findAll(): Promise<Answer[]> {
        return await this.answerRepository.find();
    }

    async findOne(id: string): Promise<Answer> {
        return await this.answerRepository.findOne({ where: { id } });
    }

    async update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
        const answer = await this.findOne(id);
        Object.assign(answer, updateAnswerDto);

        return await this.answerRepository.save(answer);
    }

    async remove(id: string): Promise<void> {
        await this.answerRepository.remove(await this.findOne(id));
    }
}
