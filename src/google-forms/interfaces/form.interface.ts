import { Request, Item } from ".";

export interface Form {
    formId: string;
    info: Info;
    settings: FormSettings;
    items: Item[];
    revisionId: string;
    responderUri: string;
    linkedSheetId: string;
}

export interface BatchUpdate {
    includeFormInResponse?: boolean;
    requests: Request[];
    writeControl?: WriteControl;
}

export interface Info {
    title?: string;
    documentTitle?: string;
    description?: string;
}

export interface FormSettings {
    quizSettings?: QuizSettings;
}

interface QuizSettings {
    isQuiz?: boolean;
}

interface WriteControl {
    requiredRevisionId?: string;
    targetRevisionId?: string;
}