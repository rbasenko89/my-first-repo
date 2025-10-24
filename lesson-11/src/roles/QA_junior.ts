import { QA } from '../abstractions/QA';
import type { IProfessional } from '../interfaces/IProfessional';
import { Level, type SalaryRange } from '../types/types';
import { QA_Mid } from './QA_mid';

export class QA_Junior extends QA {
    constructor(name: string, years = 0) {
        super(name, Level.Jun, years);
    }
    protected focus(): string {
        return 'basic test design, execution, learn processes';
    }
    salary(): SalaryRange {
        return { min: 700, max: 1500, currency: 'EUR' };
    }
    nextStep(): IProfessional | null {
        return new QA_Mid(this.name, Math.max(this.years, 2));
    }
}

export const QA_Jun = QA_Junior;
