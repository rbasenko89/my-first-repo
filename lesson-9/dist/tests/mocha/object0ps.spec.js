"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const assert_1 = __importDefault(require("assert"));
const QA_mid_1 = require("../../src/roles/QA_mid");
const objectOps_1 = require("../../src/utils/objectOps");
const { expect } = chai_1.default;
describe('objectOps (Mocha)', () => {
    it('toDTO() формує правильні поля', () => {
        const p = new QA_mid_1.QA_Mid('Dmytro', 3);
        const dto = (0, objectOps_1.toDTO)(p);
        expect(dto).to.have.property('name', 'Dmytro'); // Chai
        assert_1.default.strictEqual(dto.role, 'QA'); // Node assert
    });
    it('bumpSalary() не мутує вхідний діапазон', () => {
        const s = { min: 1000, max: 2000, currency: 'EUR' };
        const bumped = (0, objectOps_1.bumpSalary)(s, 250);
        expect(bumped).to.deep.equal({ min: 1250, max: 2250, currency: 'EUR' });
        expect(bumped).to.not.equal(s);
    });
    it('summarize() повертає валідні рядки', () => {
        const p = new QA_mid_1.QA_Mid('Iryna', 3);
        const res = (0, objectOps_1.summarize)(p);
        expect(res.who).to.be.a('string');
        expect(res.duties).to.be.a('string');
    });
    it('cloneWithPatch() працює з частковими патчами', () => {
        const base = { a: 1, b: 2 };
        const patched = (0, objectOps_1.cloneWithPatch)(base, { b: 3 });
        expect(patched).to.deep.equal({ a: 1, b: 3 });
    });
});
