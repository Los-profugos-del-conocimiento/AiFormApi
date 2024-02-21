import { Completions } from '../chat-gpt/chat-gpt.interface';

export const PromptRules = (prompt: string): Completions => {
    return [{
        role: 'user',
        content: prompt
    }]
}

export const QuizRules: Completions = [{
    role: 'user',
    content: `
        Genera un formulario de tipo Quiz. 
        Es decir, cada pregunta obligatoriamente debería tener una o varias respuestas correctas.
    `
}]

export const SurveyRules: Completions = [{
    role: 'user',
    content: `
        Genera un formulario de tipo Survey,
        Es decir, las preguntas no deberían tener respuestas correctas.
    `
}]

export const DifficultyRules = (difficulty: number): Completions => {
    return [{
        role: 'user',
        content: `
            El quiz debe ser generado con un nivel de dificultad ${difficulty},
            tomando en cuenta el siguiente rango:
            1 - Fácil
            2 - Medio
            3 - Difícil
            4 - Muy difícil
            5 - Extremadamente difícil
        `
    }]
}

export const QuestionRules = (questions: number): Completions => {
    return [{
        role: 'user',
        content: `
            Genera el formulario con ${questions} preguntas.
            Cada pregunta debe tener un tipo de respuesta definido.
        `
    }]
}

export const AnswerRules = (answerTypes: string[], isQuiz: boolean): Completions => {
    const rulesContent = answerTypes
    .map(type => QuestionRulesMap[type] ? QuestionRulesMap[type](isQuiz) : '')
    .filter(rule => rule)
    .join('\n\n');
    
    return [{
        role: 'user',
        content: `
            Para el formulario actual, los tipos de las respuestas de las preguntas
            solo pueden ser de los tipos: ${answerTypes.join(', ')}.
            Es importante aclarar que los tipos de respuesta indicados deberían
            estar en al menos una pregunta del formulario.
            
            ${rulesContent}
        `.trim()
    }];
};

export const ResponseRules: Completions = [{
    role: 'user',
    content: `
        Las preguntas y las respuestas deben estar generadas en formato json con la siguiente estructura 
        y exactamente los nombres de keys mostrados a continuación:
        
        {
            "question": "¿Qué tipo de plástico consumes más?",
            "responseType": "radio", // El tipo de respuesta para la pregunta
            "answers": , // La definición de la key answers depende del tipo de respuesta explicado anteriormente 
        }
        
        Genera la respuesta solo devolviendo el json, no agregues texto o explicaciones adicionales,
        porque la respuesta que me des lo voy a parsear en JSON y no quiero que falle.
    `
}]

const generateAnswerRules = (type: string, examples: string[], includeCorrect: boolean = true) => `
    - ${type}: Pregunta de ${type}
    "answers": [
        ${examples.map(example => `{
            "text": "${example}",
            ${includeCorrect ? `"correct": ${example.includes("1")}` : ''}
        }`).join(',\n        ')}
    ]
`.trim();

const QuestionRulesMap: Record<string, (isQuiz: boolean) => string> = {
    radio: (isQuiz) => generateAnswerRules("radio", ["Opción 1", "Opción 2", "Opción 3"], isQuiz),
    checkbox: (isQuiz) => generateAnswerRules("checkbox", ["Opción 1", "Opción 12", "Opción 3"], isQuiz),
    dropdown: (isQuiz) => generateAnswerRules("dropdown", ["Opción 1", "Opción 2", "Opción 3"], isQuiz),
    text: (isQuiz) => isQuiz ? generateAnswerRules("text", ["Respuesta correcta 1", "Respuesta correcta 2"], false) : '- text: Pregunta de texto\n    "answers": undefined',
    scale: (isQuiz) => isQuiz ? generateAnswerRules("scale", ["1", "2"], true) : '- scale: Pregunta de escala\n    "answers": undefined',
    date: (isQuiz) => isQuiz ? generateAnswerRules("date", ["2022-12-31", "2022-02-29"], true) : '- date: Pregunta de fecha\n    "answers": undefined',
    time: (isQuiz) => isQuiz ? generateAnswerRules("time", ["23:59", "01:00"], true) : '- time: Pregunta de tiempo\n    "answers": undefined',
    file: () => '- file: Pregunta de subida de archivos\n    "answers": undefined',
};
