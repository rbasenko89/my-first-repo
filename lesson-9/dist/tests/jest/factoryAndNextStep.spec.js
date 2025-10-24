"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const professionalFactory_1 = require("../../src/factory/professionalFactory");
const QA_junior_1 = require("../../src/roles/QA_junior");
const QA_mid_1 = require("../../src/roles/QA_mid");
const QA_lead_1 = require("../../src/roles/QA_lead");
const chai_1 = require("chai");
describe('professionalFactory & QA_Junior.nextStep (Jest + Chai)', () => {
    test('professionalFactory() створює QA_Lead', () => {
        const p = (0, professionalFactory_1.professionalFactory)({ name: 'Ira', path: 'QA_Lead', years: 8 });
        expect(p).toBeInstanceOf(QA_lead_1.QA_Lead); // Jest
        (0, chai_1.expect)(p.roleName).to.equal('QA'); // Chai
    });
    test('professionalFactory() кидає помилку на Unknown path', () => {
        const bad = () => (0, professionalFactory_1.professionalFactory)({ name: 'X', path: 'Nope' });
        expect(bad).toThrow(/Unknown path/i); // Jest
    });
    test('QA_Junior.nextStep() повертає QA_Mid і зберігає name', () => {
        const j = new QA_junior_1.QA_Junior('Oksana', 1);
        const n = j.nextStep();
        expect(n).toBeInstanceOf(QA_mid_1.QA_Mid); // Jest
        (0, chai_1.expect)(n?.describe()).to.include('Oksana'); // Chai
    });
});
