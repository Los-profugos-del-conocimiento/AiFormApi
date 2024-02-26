import { OpenAI } from 'openai';

export type Completions = OpenAI.Chat.Completions.ChatCompletionMessageParam[];

export type ChatCompletion = OpenAI.Chat.ChatCompletion;

export interface FormResponse {
    questions: Question[];
}

interface Question {
    question: string;
    description?: string;
    answerType: string;
    answers: Answer[];
}

interface Answer {
    text: string;
    correct?: boolean;
}
