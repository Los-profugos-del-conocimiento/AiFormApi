import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private readonly answerRepository: Repository<Answer>,
    ) {}

    // async create(createAnswerDto: CreateAnswerDto | CreateAnswerDto[]): Promise<Answer | Answer[]> {
    //     if (Array.isArray(createAnswerDto))
    //         return await this.answerRepository.save(this.answerRepository.create(createAnswerDto));
    //     else return await this.answerRepository.save(this.answerRepository.create(createAnswerDto));
    // }

    async create(createAnswerDto: CreateAnswerDto[]): Promise<Answer | Answer[]> {
        return await Promise.all(createAnswerDto.map(async (createAnswerDto) =>
            await this.answerRepository.save(this.answerRepository.create(createAnswerDto))
        ));
    }

    async findAll(): Promise<Answer[]> {
        return await this.answerRepository.find();
    }

    async findOne(id: string): Promise<Answer> {
        const answer: Answer = await this.answerRepository.findOne({ where: { id } });

        if (!answer) throw new NotFoundException(`Answer with ID ${id} not found`);

        return answer;
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
