import { Image, Video, Question, ChoiceQuestion } from '.';

export interface Item {
    itemId?: string;
    title: string;
    description?: string;
    
    questionItem?: QuestionItem;
    questionGroupItem?: QuestionGroupItem;
    pageBreakItem?: PageBreakItem;
    textItem?: TextItem;
    imageItem?: ImageItem;
    videoItem?: VideoItem;
}

interface QuestionItem {
    question: Question;
    image?: Image;
}

interface QuestionGroupItem {
    questions: Question[];
    image?: Image;
    grid: Grid;
}

interface PageBreakItem {}

interface TextItem {}

interface ImageItem {
    image: Image;
}

interface VideoItem {
    video: Video;
    caption?: string;
}

interface Grid {
    columns: ChoiceQuestion[];
    suffleQuestions?: boolean;
}
