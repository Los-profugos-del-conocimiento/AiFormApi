export const AppConfiguration = () => ({
    port: process.env.PORT,
    urlFrontend: process.env.URL_FRONTEND,
    openaiApiKey: process.env.OPENAI_API_KEY,
    googleApiToken: process.env.GOOGLE_API_TOKEN,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
    jwtSecret: process.env.JWT_SECRET,
    redisHost: process.env.REDIS_HOST,
    jwtCookieName: process.env.JWT_COOKIE_NAME,
});
