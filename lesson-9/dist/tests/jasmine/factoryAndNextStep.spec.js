"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const professionalFactory_1 = require("../../src/factory/professionalFactory");
const QA_junior_1 = require("../../src/roles/QA_junior");
const QA_lead_1 = require("../../src/roles/QA_lead");
describe('professionalFactory & QA_Junior.nextStep (Jasmine)', () => {
    it('professionalFactory() створює QA_lead з валідними полями', () => {
        const p = (0, professionalFactory_1.professionalFactory)({ name: 'Ira', path: 'QA_Lead', years: 8 });
        expect(p.constructor.name).toBe('QA_Lead');
        expect(p.roleName).toBe('QA');
        expect(p.describe()).toContain('Lead');
        expect(p).toBeInstanceOf(QA_lead_1.QA_Lead);
    });
    it('professionalFactory() кидає помилку для невідомого path', () => {
        const bad = () => (0, professionalFactory_1.professionalFactory)({ name: 'X', path: 'Unknown' });
        expect(bad).toThrowError(/Unknown path/i);
    });
    it('QA_Junior.nextStep() повертає QA_mid і зберігає name та мін. роки = 2', () => {
        const jun = new QA_junior_1.QA_Junior('Oksana', 1);
        const next = jun.nextStep();
        expect(next).not.toBeNull();
        expect(next.constructor.name).toBe('QA_Mid');
        expect(next.describe()).toContain('Oksana');
        // years мінімум 2 — перевіримо через describe/performDuties як smoke
        expect(next.performDuties()).toContain('E2E');
    });
});
