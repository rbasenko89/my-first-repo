import { professionalFactory } from '../../src/factory/professionalFactory';
import { QA_Junior } from '../../src/roles/QA_junior';
import { QA_Mid } from '../../src/roles/QA_mid';
import { QA_Lead } from '../../src/roles/QA_lead';
import { expect as chaiExpect } from 'chai';

describe('professionalFactory & QA_Junior.nextStep (Jest + Chai)', () => {
    test('professionalFactory() створює QA_Lead', () => {
        const p = professionalFactory({ name: 'Ira', path: 'QA_Lead', years: 8 });
        expect(p).toBeInstanceOf(QA_Lead); // Jest
        chaiExpect(p.roleName).to.equal('QA'); // Chai
    });

    test('professionalFactory() кидає помилку на Unknown path', () => {
        const bad = () => professionalFactory({ name: 'X', path: 'Nope' as any });
        expect(bad).toThrow(/Unknown path/i); // Jest
    });

    test('QA_Junior.nextStep() повертає QA_Mid і зберігає name', () => {
        const j = new QA_Junior('Oksana', 1);
        const n = j.nextStep();
        expect(n).toBeInstanceOf(QA_Mid); // Jest
        chaiExpect(n?.describe()).to.include('Oksana'); // Chai
    });
});
