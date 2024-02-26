import { BatchUpdate, Request } from '../../google-forms/interfaces';
import { ChoiceType } from '../../google-forms/google-forms.enum';
import { Form } from '../../form/entities/form.entity';
import { Item } from '../../item/entities/item.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleFormsAdapter {
    constructor() {}

    generateBatchUpdateRequest(form: Form, googleFormId: string): BatchUpdate {
        const { type, items }: Form = form;

        const requests: Request[] = items.map((item, index) => ({
            createItem: {
                item: {
                    title: item.question,
                    description: item.description,
                    questionItem: {
                        question: this.generateQuestion(item, type === 'quiz')
                    }
                },
                location: { index }
            }
        }));

        return {
            includeFormInResponse: true,
            requests: [
                {
                    updateSettings: {
                        settings: { quizSettings: { isQuiz: type === 'quiz' } },
                        updateMask: '*'
                    }
                },
                ...requests
            ]
        };
    }

    private generateQuestion(item: Item, isQuiz: boolean): any {
        const commonProps = {
            grading: isQuiz ? { 
                pointValue: 1, 
                correctAnswers: { 
                    answers: item.answers.filter(answer => answer.correct).map(answer => ({ value: answer.text })) 
                } 
            } : undefined
        };

        switch (item.answerType.toUpperCase()) {
            case "RADIO":
            case "CHECKBOX":
            case "DROP_DOWN":
                return { 
                    ...commonProps,
                    choiceQuestion: {
                        type: item.answerType.toUpperCase() as ChoiceType,
                        options: item.answers.map(answer => ({ value: answer.text }))
                    }
                } 
            case "TEXT":
                return {
                    ...commonProps,
                    textQuestion: { paragraph: true } 
                };
            case "SCALE":
                return {
                    scaleQuestion: { low: 1, high: 5 } 
                };
            case "DATE":
                return {
                    dateQuestion: {
                        includeTime: false,
                        includeYear: true
                    } 
                };
            case "TIME":
                return {
                    timeQuestion: { duration: false } 
                };
            default:
                return undefined;
        }
    }
}
