import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto, UpdateAnswerDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private readonly answerRepository: Repository<Answer>,
    ) {}

    async create(createAnswerDto: CreateAnswerDto[]): Promise<Answer[]> {
        const answers = createAnswerDto.map(dto => this.answerRepository.create(dto));

        await this.answerRepository.save(answers);

        return await Promise.all(answers.map(answer => this.findOne(answer.id)));
    }

    async findOne(id: string, relations?: string[]): Promise<Answer> {
        if (!id) throw new NotFoundException('Answer ID not provided.');

        const answer = await this.answerRepository.findOne({  where: { id }, relations });
        if (!answer) throw new NotFoundException(`Answer with ID "${id}" not found`);

        return answer;
    }

    async update(updateAnswerDto: UpdateAnswerDto[]): Promise<Answer[]> {
        const answers = updateAnswerDto.map(dto => this.answerRepository.create(dto));

        await this.answerRepository.save(answers);

        return await Promise.all(answers.map(async answer => await this.findOne(answer.id)));
    }

    async remove(id: string): Promise<Answer> {
        return this.answerRepository.remove(await this.findOne(id));
    }
}
