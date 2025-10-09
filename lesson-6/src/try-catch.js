class CustomServerError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'CustomServerError';
        this.status = status || null;
    }
}

async function fetchWithFallback(primary, fallback) {
    try {
        console.log(`Спроба звернутися до primary: ${primary}`);
        const res = await fetch(primary);
        // Якщо сервер відповів, але статус не ок — теж вважаємо це помилкою для primary, можна підставити інший праймарі для тестування
        if (!res.ok) {
            throw new Error(`Primary returned non-ok status: ${res.status}`);
        }

        console.log('Primary відповів успішно');
        return await res.json();
    } catch (primaryError) {
        console.warn(`Primary failed: ${primaryError.message}`);
        console.log(`Переключаємося на fallback: ${fallback}`);

        try {
            const res2 = await fetch(fallback);

            if (!res2.ok) {
                // наша власна помилка
                throw new CustomServerError(`Fallback returned bad status: ${res2.status} ${res2.statusText}`, res2.status);
            }

            console.log('✓ Fallback відповів успішно.');
            return await res2.json();
        } catch (fallbackError) {
            // Якщо й fallback кинув помилку (мережа або CustomServerError), пробросимо її далі
            throw fallbackError;
        }
    }
}

(async function main() {
    const primaryUrl = 'https://jsonplaceholder.typicode.com/users-fake';
    const fallbackUrl = 'https://jsonplaceholder.typicode.com/users';

    try {
        const data = await fetchWithFallback(primaryUrl, fallbackUrl);
        console.log('\n  Отримані дані перших трьох юзерів(в разі якщо їх більше)');
        console.log(Array.isArray(data) ? data.slice(0, 3) : data);
    } catch (err) {
        if (err instanceof CustomServerError) {
            console.error(`CustomServerError: ${err.message} (status: ${err.status})`);
        } else {
            console.error(`Помилка при запиті: ${err.name}: ${err.message}`);
        }
    } finally {
        console.log('\n Спроба завершена');
    }
})();
