import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { validateAnswer } from './answer.utils';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private readonly answerRepository: Repository<Answer>,
    ) {}

    async create(createAnswerDto: CreateAnswerDto[]): Promise<Answer[]> {
        return await Promise.all(createAnswerDto.map(async (createAnswerDto) => {
            const answer: Answer = this.answerRepository.create(createAnswerDto);
            return await this.answerRepository.save(validateAnswer(answer));
        }));
    }

    async findAll(): Promise<Answer[]> {
        return await this.answerRepository.find();
    }

    async findOne(id: string): Promise<Answer> {
        const answer: Answer = await this.answerRepository.findOne({ 
            where: { id }, relations: ['item', 'item.form']
        });

        if (!answer) throw new NotFoundException(`Answer with ID ${id} not found`);

        return answer;
    }

    async update(updateAnswerDto: UpdateAnswerDto[]): Promise<Answer[]> {
        return Promise.all(updateAnswerDto.map(async (dto) => {
            const answer = await this.findOne(dto.id);
            const formType = answer.item?.form?.type;
            const answerType = answer.item?.answerType;
    
            if (formType === 'quiz' && ['radio', 'checkbox', 'drop_down', 'text'].includes(answerType)) {
                if (dto.correct === undefined || dto.correct === null) 
                    throw new BadRequestException('Correct field is required for quiz type forms');
            } else delete dto.correct;
    
            Object.assign(answer, dto);
    
            return await this.answerRepository.save(answer);
        }));
    }
    

    async remove(id: string): Promise<Answer> {
        return this.answerRepository.remove(await this.findOne(id));
    }
}
