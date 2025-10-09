function fetchData() {
    // тестовий API з фейковими даними рандомних фейкових юзерів ))
    return fetch('https://jsonplaceholder.typicode.com/users').then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    });
}

function processUsers(users) {
    console.log('Кількість юзерів:', users.length);
    // вивід масиву імен і прізвищ юзерів
    const names = users.map((user) => user.name);
    console.log('Імена і прізвиша юзерів:', names);

    // масив мейлів юзерів
    const emails = users.map((user) => user.email);
    console.log('Email-адреси юзерів:', emails);
}

// виклик функції і передача отриманого результату в наступну функцію через then()
fetchData()
    .then((data) => {
        console.log('Дані юзерів успішно отримано');
        processUsers(data);
    })
    .catch((error) => {
        console.error('Виникла помилка під час запиту:', error.message);
    })
    .finally(() => {
        console.log('Запит оброблено');
    });
