let num = 10;
let str = '10';
let bool = true;
let n = null;
let undef;

console.log(num == str);
console.log(num === str);
console.log(num != str);
console.log(num !== str);

console.log(num > 5);
console.log(num < 5);
console.log(num >= 10);
console.log(num <= 10);

console.log(bool && num > 5);
console.log(bool && num < 5);
console.log(bool || num < 5);
console.log(!bool);
console.log(!(num < 5));

console.log(n == undef);
console.log(n === undef);
console.log(n || num);
console.log(undef && bool);
