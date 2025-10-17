import type { IProfessional } from '../interfaces/IProfessional';

export function processCareer(pro: IProfessional): void {
    const sal = pro.salary();
    console.log(`→ ${pro.describe()}`);
    console.log(`   Duties: ${pro.performDuties()}`);
    console.log(`   Salary: ${sal.min}-${sal.max} ${sal.currency}`);

    const next = pro.nextStep();
    if (next) {
        console.log('   Next step suggestion:');
        console.log(`   ${next.describe()}`);
    } else {
        console.log('   No further suggested step.');
    }
}
