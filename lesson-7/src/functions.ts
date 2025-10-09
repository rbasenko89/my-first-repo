export function sumArray(arr: (number | string)[]): number {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];

        if (typeof el === 'number') {
            sum += el;
        } else if (typeof el === 'string') {
            const n = Number(el);
            if (Number.isFinite(n)) {
                sum += n;
            }
        }
    }

    return sum;
}
