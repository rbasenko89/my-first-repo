"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai"); // Chai-асершени в Jasmine
const QA_junior_1 = require("../../src/roles/QA_junior");
const objectOps_1 = require("../../src/utils/objectOps");
describe('objectOps (Jasmine)', () => {
    it('toDTO() має виробляти DTO без мутацій', () => {
        const p = new QA_junior_1.QA_Junior('Oksana', 1);
        const dto = (0, objectOps_1.toDTO)(p);
        expect(dto.name).toBe('Oksana'); // Jasmine expect
        expect(dto.role).toBe('QA');
        (0, chai_1.expect)(dto.salaryMin).to.be.a('number'); // Chai expect
        (0, chai_1.expect)(dto.currency).to.equal('EUR');
    });
    it('bumpSalary() повертає новий об’єкт', () => {
        const p = new QA_junior_1.QA_Junior('Taras', 1);
        const s = p.salary();
        const bumped = (0, objectOps_1.bumpSalary)(s, 100);
        expect(bumped.min).toBe(s.min + 100);
        expect(bumped).not.toBe(s); // переконуємось, що не та ж сама ссилка
    });
    it('summarize() повертає next як рядок або null', () => {
        const p = new QA_junior_1.QA_Junior('Ira', 1);
        const sum = (0, objectOps_1.summarize)(p);
        (0, chai_1.expect)(sum.who).to.include('QA');
        (0, chai_1.expect)(sum.next).to.be.a('string');
    });
    it('cloneWithPatch() робить глибоку копію з патчем', () => {
        const base = { a: 1, deep: { x: 2 } };
        const patched = (0, objectOps_1.cloneWithPatch)(base, { a: 2 });
        expect(patched.a).toBe(2);
        (0, chai_1.expect)(patched).not.to.equal(base);
    });
});
