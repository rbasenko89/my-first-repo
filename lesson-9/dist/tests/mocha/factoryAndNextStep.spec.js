"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const professionalFactory_1 = require("../../src/factory/professionalFactory");
const QA_junior_1 = require("../../src/roles/QA_junior");
const QA_mid_1 = require("../../src/roles/QA_mid");
const QA_lead_1 = require("../../src/roles/QA_lead");
const chai_1 = __importDefault(require("chai"));
const { expect } = chai_1.default;
describe('professionalFactory & QA_Junior.nextStep (Mocha + Chai)', () => {
    it('professionalFactory() створює QA_Lead', () => {
        const p = (0, professionalFactory_1.professionalFactory)({ name: 'Ira', path: 'QA_Lead', years: 8 });
        expect(p).to.be.instanceOf(QA_lead_1.QA_Lead);
        expect(p.roleName).to.equal('QA');
    });
    it('professionalFactory() кидає помилку, якщо path невідомий', () => {
        const bad = () => (0, professionalFactory_1.professionalFactory)({ name: 'X', path: 'Nope' });
        expect(bad).to.throw(/Unknown path/i);
    });
    it("QA_Junior.nextStep() -> QA_Mid з тим самим ім'ям", () => {
        const j = new QA_junior_1.QA_Junior('Oksana', 1);
        const next = j.nextStep();
        expect(next).to.be.instanceOf(QA_mid_1.QA_Mid);
        expect(next?.describe()).to.contain('Oksana');
    });
});
