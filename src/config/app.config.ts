export const AppConfiguration = () => ({
    port: process.env.PORT,
    openaiApiKey: process.env.OPENAI_API_KEY,
    googleApiToken: process.env.GOOGLE_API_TOKEN,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
});
