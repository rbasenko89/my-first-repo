'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const professionalFactory_1 = require('./factory/professionalFactory');
const QA_junior_1 = require('./roles/QA_junior');
const processCareer_1 = require('./utils/processCareer');
console.log('=== Demo ===');
const people = [
    (0, professionalFactory_1.professionalFactory)({ name: 'Oksana', path: 'QA_Jun', years: 1 }),
    (0, professionalFactory_1.professionalFactory)({ name: 'Taras', path: 'QA_Mid', years: 3 }),
    (0, professionalFactory_1.professionalFactory)({ name: 'Ira', path: 'QA_Sin', years: 6 }),
    (0, professionalFactory_1.professionalFactory)({ name: 'Dmytro', path: 'QA_Lead', years: 8 }),
    (0, professionalFactory_1.professionalFactory)({ name: 'Nazar', path: 'AQA', stack: 'TS' }),
    (0, professionalFactory_1.professionalFactory)({ name: 'Olha', path: 'Manager', domain: 'QA Chapter' }),
    (0, professionalFactory_1.professionalFactory)({ name: 'Yulia', path: 'ExitIT', destination: 'Own coffee shop' })
];
people.forEach((p) => {
    (0, processCareer_1.processCareer)(p);
    console.log('');
});
console.log('=== Promotion chain example (QA_Jun → ... ) ===');
let r = new QA_junior_1.QA_Jun('Stepan', 1);
while (r) {
    (0, processCareer_1.processCareer)(r);
    r = r.nextStep();
    console.log('');
}
