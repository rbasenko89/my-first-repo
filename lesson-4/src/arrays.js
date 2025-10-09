const fruits = ['apple', 'banana', 'cherry', 'orange'];
console.log('Рядковий масив:', fruits);

const numbers = [1, 2, 3, 4, 5];
console.log('Числовий масив:', numbers);

const flags = [true, false, true, true, false];
console.log('Boolean масив:', flags);

const mixed = ['hello', 42, true, null, { name: 'Ramella' }];
console.log('Any масив:', mixed);

// operations
// log array element to console
console.log('Перший фрукт:', fruits[0]);
console.log('Останнє число:', numbers[numbers.length - 1]);

//add element
fruits.push('mango');
console.log('Після додавання:', fruits);
//remove element
numbers.pop();
console.log('Після видалення останнього:', numbers);

// filter
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log('Парні числа:', evenNumbers);

//  for each and map
fruits.forEach((fruit, index) => {
    console.log(index, fruit.toUpperCase());
});

const squared = numbers.map((num) => num * num);
console.log('Квадрати чисел:', squared);
