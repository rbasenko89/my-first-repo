'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const QA_sin_1 = require('../../src/roles/QA_sin');
const chai_1 = require('chai');
const objectOps_1 = require('../../src/utils/objectOps');
describe('objectOps (Jest)', () => {
    test('toDTO() генерує опис та зарплату', () => {
        const p = new QA_sin_1.QA_Sin('Olha', 6);
        const dto = (0, objectOps_1.toDTO)(p);
        expect(dto.name).toBe('Olha'); // Jest expect
        expect(dto.role).toBe('QA');
        (0, chai_1.expect)(dto.salaryMax).to.be.greaterThan(dto.salaryMin); // Chai паралельно
    });
    test('bumpSalary() коректно додає дельту', () => {
        const p = new QA_sin_1.QA_Sin('Nazar', 5);
        const s = p.salary();
        const bumped = (0, objectOps_1.bumpSalary)(s, 500);
        expect(bumped.min).toBe(s.min + 500);
        expect(bumped.max).toBe(s.max + 500);
        expect(bumped).not.toBe(s);
    });
    test('summarize() next може бути string або null', () => {
        const p = new QA_sin_1.QA_Sin('Yulia', 7);
        const res = (0, objectOps_1.summarize)(p);
        expect(typeof res.who).toBe('string');
        // Chai приклад:
        (0, chai_1.expect)(res.next === null || typeof res.next === 'string').to.equal(true);
    });
    test('cloneWithPatch() глибока копія + патч', () => {
        const base = { a: 1, deep: { x: 1 } };
        const patched = (0, objectOps_1.cloneWithPatch)(base, { a: 2 });
        expect(patched).toEqual({ a: 2, deep: { x: 1 } });
        (0, chai_1.expect)(patched).not.to.equal(base);
    });
});
