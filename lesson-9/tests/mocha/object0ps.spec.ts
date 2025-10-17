import chai from 'chai';
import assert from 'assert';
import { QA_Mid } from '../../src/roles/QA_mid';
import { bumpSalary, cloneWithPatch, summarize, toDTO } from '../../src/utils/objectOps';
const { expect } = chai;

describe('objectOps (Mocha)', () => {
    it('toDTO() формує правильні поля', () => {
        const p = new QA_Mid('Dmytro', 3);
        const dto = toDTO(p);

        expect(dto).to.have.property('name', 'Dmytro'); // Chai
        assert.strictEqual(dto.role, 'QA'); // Node assert
    });

    it('bumpSalary() не мутує вхідний діапазон', () => {
        const s = { min: 1000, max: 2000, currency: 'EUR' as const };
        const bumped = bumpSalary(s, 250);

        expect(bumped).to.deep.equal({ min: 1250, max: 2250, currency: 'EUR' });
        expect(bumped).to.not.equal(s);
    });

    it('summarize() повертає валідні рядки', () => {
        const p = new QA_Mid('Iryna', 3);
        const res = summarize(p);

        expect(res.who).to.be.a('string');
        expect(res.duties).to.be.a('string');
    });

    it('cloneWithPatch() працює з частковими патчами', () => {
        const base = { a: 1, b: 2 };
        const patched = cloneWithPatch(base, { b: 3 });
        expect(patched).to.deep.equal({ a: 1, b: 3 });
    });
});
