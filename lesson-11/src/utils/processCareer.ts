import { IProfessional } from '../interfaces/IProfessional';
import { SalaryRange } from '../types/types';

export type CareerSnapshot = {
    description: string;
    duties: string;
    salary: SalaryRange;
    nextDescription: string | null;
};

//Тепер повертає snapshot

export function processCareer(pro: IProfessional): CareerSnapshot {
    const sal = pro.salary();
    const description = pro.describe();
    const duties = pro.performDuties();
    const next = pro.nextStep();
    const nextDescription = next ? next.describe() : null;

    // залишимо логування як було
    console.log(`→ ${description}`);
    console.log(`   Duties: ${duties}`);
    console.log(`   Salary: ${sal.min}-${sal.max} ${sal.currency}`);
    console.log(next ? `   Next: ${nextDescription}` : '   No further suggested step.');

    return {
        description,
        duties,
        salary: sal,
        nextDescription
    };
}
