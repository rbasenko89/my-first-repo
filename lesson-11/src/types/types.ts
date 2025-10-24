export enum Level {
    Jun = 'Junior',
    Mid = 'Middle',
    Sin = 'Senior',
    Lead = 'Lead'
}

export type SalaryRange = {
    min: number;
    max: number;
    currency: 'USD' | 'EUR' | 'PLN';
};
