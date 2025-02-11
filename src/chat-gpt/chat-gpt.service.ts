import { Completions, ChatCompletion, FormResponse } from './chat-gpt.interface';
import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class ChatGptService {
    private readonly model: string = 'gpt-3.5-turbo-0125';
    private readonly n: number = 1; // number of choices generated per request

    constructor(private readonly openai: OpenAI) {}

    async generateForm(messages: Completions): Promise<FormResponse> {
        messages.unshift({ role: 'system', content: 'Gpt Boy, eres un genial asistente.' });
        try {
            const response: ChatCompletion = await this.openai.chat.completions.create({
                response_format: { type: "json_object" },
                model: this.model,
                n: this.n,
                messages,
                // stream: true
            });

            // for await (const chunk of response)
            //     process.stdout.write(chunk.choices?.at(0)?.delta?.content || "");
        
            // toDo: Save usage data on database
            console.log('usage', response.usage);
            // console.log('response', response.choices?.at(0)?.message?.content);
            return JSON.parse(response.choices?.at(0)?.message?.content) || '';
        } catch (error) {
            const msg = (error as any as Error)?.message || 'Uncontrolled error';
            throw new Error(`AI Completions error: ${msg}`);
        }
    }

    async generateTitle(messages: Completions): Promise<string> {
        messages.unshift({ role: 'system', content: 'Gpt Boy, eres un genial asistente.' });
        try {
            const response: ChatCompletion = await this.openai.chat.completions.create({
                response_format: { type: "json_object" },
                model: this.model,
                n: this.n,
                messages,
            })

            console.log('title usage', response.usage);
            return JSON.parse(response.choices?.at(0)?.message?.content).title || '';
        } catch (error) {
            const msg = (error as any as Error)?.message || 'Uncontrolled error';
            throw new Error(`Title AI Completions error: ${msg}`);
        }
    }
}
