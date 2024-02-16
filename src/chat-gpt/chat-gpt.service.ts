import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { Completions } from './chat-gpt.interface';

@Injectable()
export class ChatGptService {
    private readonly modelChat: string = 'gpt-3.5-turbo';
    private readonly countChatCompletions: number = 1;

    constructor(private readonly openai: OpenAI) {}

    async generateCompletions(messages: Completions): Promise<string> {
        try {
            const response = await this.openai.chat.completions.create({
                n: this.countChatCompletions,
                model: this.modelChat,
                messages,
            });
        
            return response.choices?.at(0)?.message?.content || '';
        } catch (error) {
            const msg = (error as any as Error)?.message || 'Uncontrolled error';
            throw new Error(`AI Completions error: ${msg}`);
        }
      }
}
