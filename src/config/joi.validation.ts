import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    URL_FRONTEND: Joi.string().default('http://localhost:3000'),
    OPENAI_API_KEY: Joi.string().required(),
    GOOGLE_API_TOKEN: Joi.string().required(),
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),
    GOOGLE_REDIRECT_URI: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    REDIS_HOST: Joi.string().default('localhost'),
    JWT_COOKIE_NAME: Joi.string().default('aiform-token-420'),
});
