import type { SalaryRange } from '../types/types';

export interface IProfessional {
    readonly name: string;
    readonly roleName: string;
    describe(): string;
    performDuties(): string;
    salary(): SalaryRange;
    nextStep(): IProfessional | null;
}
