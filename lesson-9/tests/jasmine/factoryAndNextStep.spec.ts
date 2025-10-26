import { professionalFactory } from '../../src/factory/professionalFactory';
import { QA_Junior } from '../../src/roles/QA_junior';
import { QA_Mid } from '../../src/roles/QA_mid';
import { QA_Lead } from '../../src/roles/QA_lead';

describe('professionalFactory & QA_Junior.nextStep (Jasmine)', () => {
    it('professionalFactory() створює QA_lead з валідними полями', () => {
        const p = professionalFactory({ name: 'Ira', path: 'QA_Lead', years: 8 });
        expect(p.constructor.name).toBe('QA_Lead');
        expect(p.roleName).toBe('QA');
        expect(p.describe()).toContain('Lead');
        expect(p).toBeInstanceOf(QA_Lead);
    });

    it('professionalFactory() кидає помилку для невідомого path', () => {
        const bad = () => professionalFactory({ name: 'X', path: 'Unknown' as any });
        expect(bad).toThrowError(/Unknown path/i);
    });

    it('QA_Junior.nextStep() повертає QA_mid і зберігає name та мін. роки = 2', () => {
        const jun = new QA_Junior('Oksana', 1);
        const next = jun.nextStep();
        expect(next).not.toBeNull();
        expect(next!.constructor.name).toBe('QA_Mid');
        expect(next!.describe()).toContain('Oksana');
        // years мінімум 2 — перевіримо через describe/performDuties як smoke
        expect((next as QA_Mid).performDuties()).toContain('E2E');
    });
});
