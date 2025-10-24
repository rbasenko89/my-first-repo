import type { IProfessional } from '../interfaces/IProfessional';
import type { SalaryRange } from '../types/types';

export class ExitIT implements IProfessional {
    readonly roleName = 'Exited IT';
    constructor(
        public readonly name: string,
        private readonly destination: string = 'Entrepreneurship'
    ) {}
    describe(): string {
        return `${this.name}: ${this.roleName} → ${this.destination}`;
    }
    performDuties(): string {
        return 'Pursuing opportunities outside of IT (business/education/creative).';
    }
    salary(): SalaryRange {
        return { min: 0, max: 0, currency: 'EUR' };
    }
    nextStep(): IProfessional | null {
        return null;
    }
}
