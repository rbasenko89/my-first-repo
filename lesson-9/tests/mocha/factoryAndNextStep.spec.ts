import { professionalFactory } from '../../src/factory/professionalFactory';
import { QA_Junior } from '../../src/roles/QA_junior';
import { QA_Mid } from '../../src/roles/QA_mid';
import { QA_Lead } from '../../src/roles/QA_lead';
import chai from 'chai';
const { expect } = chai;

describe('professionalFactory & QA_Junior.nextStep (Mocha + Chai)', () => {
    it('professionalFactory() створює QA_Lead', () => {
        const p = professionalFactory({ name: 'Ira', path: 'QA_Lead', years: 8 });
        expect(p).to.be.instanceOf(QA_Lead);
        expect(p.roleName).to.equal('QA');
    });

    it('professionalFactory() кидає помилку, якщо path невідомий', () => {
        const bad = () => professionalFactory({ name: 'X', path: 'Nope' as any });
        expect(bad).to.throw(/Unknown path/i);
    });

    it("QA_Junior.nextStep() -> QA_Mid з тим самим ім'ям", () => {
        const j = new QA_Junior('Oksana', 1);
        const next = j.nextStep();
        expect(next).to.be.instanceOf(QA_Mid);
        expect(next?.describe()).to.contain('Oksana');
    });
});
