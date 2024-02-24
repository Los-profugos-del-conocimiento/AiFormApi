import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { Completions, ChatCompletion } from './chat-gpt.interface';

@Injectable()
export class ChatGptService {
    private readonly model: string = 'gpt-3.5-turbo-0125';
    private readonly n: number = 1; // number of choices generated per request

    constructor(private readonly openai: OpenAI) {}

    async generateCompletions(messages: Completions): Promise<string> {
        messages.unshift({ role: 'system', content: 'Gpt Boy, eres un genial asistente.' });
        try {
            const response: ChatCompletion = await this.openai.chat.completions.create({
                model: this.model,
                n: this.n,
                // prompt: messages[0].content,
                messages,
                response_format: { type: "json_object" },
                // stream: true
            });

            // for await (const chunk of response)
            //     process.stdout.write(chunk.choices?.at(0)?.delta?.content || "");
        
            // console.log('usage', response.usage);
            // return 'asd';
            return response.choices?.at(0)?.message?.content || '';
        } catch (error) {
            const msg = (error as any as Error)?.message || 'Uncontrolled error';
            throw new Error(`AI Completions error: ${msg}`);
        }
      }
}
