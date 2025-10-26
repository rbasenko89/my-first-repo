import { expect as chaiExpect } from 'chai'; // Chai-асершени в Jasmine
import { QA_Junior } from '../../src/roles/QA_junior';
import { bumpSalary, cloneWithPatch, summarize, toDTO } from '../../src/utils/objectOps';

describe('objectOps (Jasmine)', () => {
    it('toDTO() має виробляти DTO без мутацій', () => {
        const p = new QA_Junior('Oksana', 1);
        const dto = toDTO(p);

        expect(dto.name).toBe('Oksana'); // Jasmine expect
        expect(dto.role).toBe('QA');
        chaiExpect(dto.salaryMin).to.be.a('number'); // Chai expect
        chaiExpect(dto.currency).to.equal('EUR');
    });

    it('bumpSalary() повертає новий об’єкт', () => {
        const p = new QA_Junior('Taras', 1);
        const s = p.salary();
        const bumped = bumpSalary(s, 100);

        expect(bumped.min).toBe(s.min + 100);
        expect(bumped).not.toBe(s); // переконуємось, що не та ж сама ссилка
    });

    it('summarize() повертає next як рядок або null', () => {
        const p = new QA_Junior('Ira', 1);
        const sum = summarize(p);
        chaiExpect(sum.who).to.include('QA');
        chaiExpect(sum.next).to.be.a('string');
    });

    it('cloneWithPatch() робить глибоку копію з патчем', () => {
        const base = { a: 1, deep: { x: 2 } };
        const patched = cloneWithPatch(base, { a: 2 });

        expect(patched.a).toBe(2);
        chaiExpect(patched).not.to.equal(base);
    });
});
