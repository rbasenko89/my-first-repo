import axios from 'axios';
import { env } from './env';

export const http = axios.create({
    baseURL: env.baseURL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000
});

export type Joke = {
    id: number;
    type: string;
    setup: string;
    punchline: string;
};
