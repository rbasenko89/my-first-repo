export const env = {
    baseURL: process.env.BASE_URL || 'https://official-joke-api.appspot.com',
    responseTimeMs: Number(process.env.RESPONSE_TIME_MS ?? 800)
};
