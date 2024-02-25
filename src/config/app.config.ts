export const AppConfiguration = () => ({
    port: process.env.PORT,
    openaiApiKey: process.env.OPENAI_API_KEY,
    googleApiToken: process.env.GOOGLE_API_TOKEN,
});
