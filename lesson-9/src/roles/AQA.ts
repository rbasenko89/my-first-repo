import type { IProfessional } from '../interfaces/IProfessional';
import type { SalaryRange } from '../types/types';

export class AQA implements IProfessional {
    readonly roleName = 'AQA';
    constructor(
        public readonly name: string,
        private readonly primaryStack: 'TS' | 'Py' | 'Java' = 'TS'
    ) {}
    describe(): string {
        return `${this.name}: ${this.roleName} (${this.primaryStack} stack)`;
    }
    performDuties(): string {
        return 'Design automation framework, write maintainable tests, CI/CD integration.';
    }
    salary(): SalaryRange {
        return { min: 2500, max: 5500, currency: 'EUR' };
    }
    nextStep(): IProfessional | null {
        return null; // або Manager / Principal AQA — за потреби
    }
}
