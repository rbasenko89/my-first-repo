import type { IProfessional } from '../interfaces/IProfessional';
import type { Level, SalaryRange } from '../types/types';

export abstract class QA implements IProfessional {
    public readonly roleName = 'QA';

    protected constructor(
        public readonly name: string,
        public readonly level: Level,
        protected readonly years: number
    ) {}

    describe(): string {
        return `${this.name}: ${this.roleName} ${this.level} (${this.years}y exp)`;
    }
    performDuties(): string {
        return `Testing features, reporting bugs, collaborating with devs. Focus: ${this.focus()}`;
    }

    protected abstract focus(): string;
    abstract salary(): SalaryRange;

    nextStep(): IProfessional | null {
        return null;
    }
}
