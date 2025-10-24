import { professionalFactory } from './factory/professionalFactory';
import type { IProfessional } from './interfaces/IProfessional';
import { QA_Jun } from './roles/QA_junior';
import { processCareer } from './utils/processCareer';

console.log('=== Demo ===');

const people: IProfessional[] = [
    professionalFactory({ name: 'Oksana', path: 'QA_Jun', years: 1 }),
    professionalFactory({ name: 'Taras', path: 'QA_Mid', years: 3 }),
    professionalFactory({ name: 'Ira', path: 'QA_Sin', years: 6 }),
    professionalFactory({ name: 'Dmytro', path: 'QA_Lead', years: 8 }),
    professionalFactory({ name: 'Nazar', path: 'AQA', stack: 'TS' }),
    professionalFactory({ name: 'Olha', path: 'Manager', domain: 'QA Chapter' }),
    professionalFactory({ name: 'Yulia', path: 'ExitIT', destination: 'Own coffee shop' })
];

people.forEach((p) => {
    processCareer(p);
    console.log('');
});

console.log('=== Promotion chain example (QA_Jun → ... ) ===');
let r: IProfessional | null = new QA_Jun('Stepan', 1);
while (r) {
    processCareer(r);
    r = r.nextStep();
    console.log('');
}
