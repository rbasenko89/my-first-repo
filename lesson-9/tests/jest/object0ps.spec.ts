import { QA_Sin } from '../../src/roles/QA_sin';

import { expect as chaiExpect } from 'chai';
import { bumpSalary, cloneWithPatch, summarize, toDTO } from '../../src/utils/objectOps';

describe('objectOps (Jest)', () => {
    test('toDTO() генерує опис та зарплату', () => {
        const p = new QA_Sin('Olha', 6);
        const dto = toDTO(p);

        expect(dto.name).toBe('Olha'); // Jest expect
        expect(dto.role).toBe('QA');
        chaiExpect(dto.salaryMax).to.be.greaterThan(dto.salaryMin); // Chai паралельно
    });

    test('bumpSalary() коректно додає дельту', () => {
        const p = new QA_Sin('Nazar', 5);
        const s = p.salary();
        const bumped = bumpSalary(s, 500);

        expect(bumped.min).toBe(s.min + 500);
        expect(bumped.max).toBe(s.max + 500);
        expect(bumped).not.toBe(s);
    });

    test('summarize() next може бути string або null', () => {
        const p = new QA_Sin('Yulia', 7);
        const res = summarize(p);
        expect(typeof res.who).toBe('string');
        // Chai приклад:
        chaiExpect(res.next === null || typeof res.next === 'string').to.equal(true);
    });

    test('cloneWithPatch() глибока копія + патч', () => {
        const base = { a: 1, deep: { x: 1 } };
        const patched = cloneWithPatch(base, { a: 2 });
        expect(patched).toEqual({ a: 2, deep: { x: 1 } });
        chaiExpect(patched).not.to.equal(base);
    });
});
