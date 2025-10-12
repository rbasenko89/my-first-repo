const sumArray = (arr) => {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'number') {
            sum += arr[i];
        } else if (!isNaN(Number(arr[i]))) {
            sum += Number(arr[i]);
        }
    }

    return sum;
};
//як і для попереднього файлу functions використовую рядковий масив з цифрами
const numbersArray = [10, 20, 30, 40];
const stringsArray = ['5', '15', '25', '10'];

const sumNumbers = sumArray(numbersArray);
const sumStrings = sumArray(stringsArray);

console.log('Сума числового масиву:', sumNumbers);
console.log('Сума рядкового масиву:', sumStrings);
