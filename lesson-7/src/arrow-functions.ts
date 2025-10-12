const sumArray = (arr: (number | string)[]): number => {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];

        if (typeof el === 'number') {
            sum += el;
        } else {
            const n = Number(el);
            if (Number.isFinite(n)) {
                sum += n;
            }
        }
    }

    return sum;
};

const numbersArray: number[] = [10, 20, 30, 40];
const stringsArray: string[] = ['5', '15', '25', '10'];

const sumNumbers = sumArray(numbersArray);
const sumStrings = sumArray(stringsArray);

console.log('Сума числового масиву:', sumNumbers); // 100
console.log('Сума рядкового масиву:', sumStrings); // 55
