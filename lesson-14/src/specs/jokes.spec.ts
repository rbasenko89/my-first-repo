import { http, type Joke } from '../core/http';
import { env } from '../core/env';

function expectJsonContentType(ct: string | undefined) {
    expect(typeof ct).toBe('string');
    expect((ct || '').toLowerCase()).toContain('application/json');
}
function isValidJoke(j: any): j is Joke {
    return (
        j &&
        typeof j.id === 'number' &&
        typeof j.type === 'string' &&
        j.type.length > 0 &&
        typeof j.setup === 'string' &&
        j.setup.length > 0 &&
        typeof j.punchline === 'string' &&
        j.punchline.length > 0
    );
}

describe('Official Joke API (Axios + Jest)', () => {
    test('1. Random Joke response general validation (/random_joke)', async () => {
        const t0 = Date.now();
        const res = await http.get('/random_joke');
        const dt = Date.now() - t0;

        expect(res.status).toBe(200);
        expectJsonContentType(res.headers['content-type']);
        expect(dt).toBeLessThan(env.responseTimeMs);

        expect(isValidJoke(res.data)).toBe(true);
    });

    test('2. Random joke is object OR single-element array (/jokes/random)', async () => {
        const t0 = Date.now();
        const res = await http.get('/jokes/random');
        const dt = Date.now() - t0;

        expect(res.status).toBe(200);
        expectJsonContentType(res.headers['content-type']);
        expect(dt).toBeLessThan(env.responseTimeMs);

        const body = res.data;
        if (Array.isArray(body)) {
            expect(body.length).toBe(1);
            expect(isValidJoke(body[0])).toBe(true);
        } else {
            expect(isValidJoke(body)).toBe(true);
        }
    });

    test('3. Jokes types returns array with unique values (/types)', async () => {
        const t0 = Date.now();
        const res = await http.get('/types');
        const dt = Date.now() - t0;

        expect(res.status).toBe(200);
        expectJsonContentType(res.headers['content-type']);
        expect(dt).toBeLessThan(env.responseTimeMs);

        const types: unknown = res.data;
        expect(Array.isArray(types)).toBe(true);
        const arr = types as string[];
        expect(arr.length).toBeGreaterThan(0);
        expect(arr.every((t) => typeof t === 'string' && t.length > 0)).toBe(true);
        expect(new Set(arr).size).toBe(arr.length); // унікальні
    });

    test('4. Random 10 returns array with 10 values (/random_ten)', async () => {
        const res = await http.get('/random_ten');
        expect(res.status).toBe(200);
        expectJsonContentType(res.headers['content-type']);
        const arr: unknown = res.data;
        expect(Array.isArray(arr)).toBe(true);
        const jokes = arr as Joke[];
        expect(jokes.length).toBe(10);
        expect(jokes.every(isValidJoke)).toBe(true);
    });

    test('5. All 10 returned jokes are unique by `setup` (/random_ten)', async () => {
        const res = await http.get('/random_ten');
        expect(res.status).toBe(200);
        const jokes = res.data as Joke[];
        const norm = (s: string) => s.trim().toLowerCase();
        const setups = jokes.map((j) => norm(j.setup));
        expect(new Set(setups).size).toBe(setups.length);
    });

    test('6. /jokes/ten returns 10 values', async () => {
        const res = await http.get('/jokes/ten');
        expect(res.status).toBe(200);
        const jokes = res.data as Joke[];
        expect(Array.isArray(jokes)).toBe(true);
        expect(jokes.length).toBe(10);
        expect(jokes.every(isValidJoke)).toBe(true);
    });
});
