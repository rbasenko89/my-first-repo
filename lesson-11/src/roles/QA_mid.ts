import { QA } from '../abstractions/QA';
import type { IProfessional } from '../interfaces/IProfessional';
import { Level, type SalaryRange } from '../types/types';
import { QA_Sin } from './QA_sin';

export class QA_Mid extends QA {
    constructor(name: string, years = 2) {
        super(name, Level.Mid, years);
    }
    protected focus(): string {
        return 'E2E scenarios, risk-based testing, test data design';
    }
    salary(): SalaryRange {
        return { min: 1500, max: 3000, currency: 'EUR' };
    }
    nextStep(): IProfessional | null {
        return new QA_Sin(this.name, Math.max(this.years, 4));
    }
}
