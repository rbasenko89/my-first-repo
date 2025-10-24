import type { IProfessional } from '../interfaces/IProfessional';
import type { SalaryRange } from '../types/types';

export class Manager implements IProfessional {
    readonly roleName = 'Manager';
    constructor(
        public readonly name: string,
        private readonly domain: string = 'Delivery'
    ) {}
    describe(): string {
        return `${this.name}: ${this.roleName} (${this.domain})`;
    }
    performDuties(): string {
        return 'People management, budgeting, hiring, roadmaps, aligning stakeholders.';
    }
    salary(): SalaryRange {
        return { min: 4500, max: 9000, currency: 'EUR' };
    }
    nextStep(): IProfessional | null {
        return null;
    }
}
