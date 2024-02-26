import { FileType, ChoiceType, Alignment } from "../google-forms.enum";
import { Item } from ".";

export interface Question {
    questionId?: string;
    required?: boolean;
    grading?: Grading;
    choiceQuestion?: ChoiceQuestion;
    textQuestion?: TextQuestion;
    scaleQuestion?: ScaleQuestion;
    dateQuestion?: DateQuestion;
    timeQuestion?: TimeQuestion;
    fileUploadQuestion?: FileUploadQuestion;
    rowQuestion?: RowQuestion;
}

export interface Grading {
    pointValue: number;
    correctAnswers: CorrectAnswers;
    whenRight?: Feedback;
    whenWrong?: Feedback;
    generalFeedback?: Feedback;
}

export interface ChoiceQuestion {
    type: ChoiceType;
    options: Option[];
    shuffle?: boolean;
}

interface TextQuestion {
    paragraph: boolean;
}

interface ScaleQuestion {
    low: number
    high: number;
    lowLabel?: string;
    highLabel?: string;
}

interface DateQuestion {
    includeTime: boolean;
    includeYear: boolean;
}

interface TimeQuestion {
    duration: boolean;
}

interface FileUploadQuestion {
    folderId: string;
    types: FileType[];
    maxFiles: number;
    maxFileSize: number;
}

interface RowQuestion {
    title: string;
}

interface CorrectAnswers {
    answers: CorrectAnswer[];
}

interface Feedback {
    text: string;
    material?: ExtraMaterial[];
}

interface Option {
    value: string;
    image?: Image;
    isOther?: boolean;
}

interface CorrectAnswer {
    value: string;
}

interface ExtraMaterial {
    link: TextLink;
    video: VideoLink;
}

interface TextLink {
    uri: string;
    displayText: string;
}

interface VideoLink {
    displayText: string;
    youtubeUri: string;
}

export interface Image {
    contentUri?: string;
    altText?: string;
    properties?: MediaProperties;
    sourceUri?: string;
}

export interface Video {
    youtubeUri: string;
    properties?: MediaProperties;
}

interface MediaProperties {
    alignment?: Alignment;
    width?: number;
}
