import { QA } from '../abstractions/QA';
import type { IProfessional } from '../interfaces/IProfessional';
import { Level, type SalaryRange } from '../types/types';
import { Manager } from './Manager';

export class QA_Lead extends QA {
    constructor(name: string, years = 6) {
        super(name, Level.Lead, years);
    }
    protected focus(): string {
        return 'quality leadership, metrics, release governance, coaching';
    }
    salary(): SalaryRange {
        return { min: 5000, max: 8000, currency: 'EUR' };
    }
    nextStep(): IProfessional | null {
        return new Manager(this.name, 'QA Chapter');
    }
}
