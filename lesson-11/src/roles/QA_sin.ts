import { QA } from '../abstractions/QA';
import type { IProfessional } from '../interfaces/IProfessional';
import { Level, type SalaryRange } from '../types/types';
import { QA_Lead } from './QA_lead';

export class QA_Sin extends QA {
    constructor(name: string, years = 4) {
        super(name, Level.Sin, years);
    }
    protected focus(): string {
        return 'test strategy, non-functional testing, mentoring';
    }
    salary(): SalaryRange {
        return { min: 3000, max: 5000, currency: 'EUR' };
    }
    nextStep(): IProfessional | null {
        return new QA_Lead(this.name, Math.max(this.years, 6));
    }
}
