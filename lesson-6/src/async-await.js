// те саме що в promises але з async-await як вказано в завданні
async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Помилка під час отримання даних:', error.message);
        throw error;
    }
}

function processUsers(users) {
    console.log('Кількість юзерів:', users.length);

    const names = users.map((user) => user.name);
    console.log('Імена і прізвиша юзерів:', names);

    const emails = users.map((user) => user.email);
    console.log('Email-адреси юзерів:', emails);
}

async function main() {
    console.log('Запит розпочато');

    try {
        const users = await fetchData();
        console.log('Дані успішно отримано');
        processUsers(users);
    } catch (error) {
        console.error('Виникла помилка:', error.message);
    } finally {
        console.log('Завершено обробку запиту');
    }
}

//Викликаємо головну функцію
main();
