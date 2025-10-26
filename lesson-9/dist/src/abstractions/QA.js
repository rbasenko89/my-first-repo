'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.QA = void 0;
class QA {
    constructor(name, level, years) {
        this.name = name;
        this.level = level;
        this.years = years;
        this.roleName = 'QA';
    }
    describe() {
        return `${this.name}: ${this.roleName} ${this.level} (${this.years}y exp)`;
    }
    performDuties() {
        return `Testing features, reporting bugs, collaborating with devs. Focus: ${this.focus()}`;
    }
    nextStep() {
        return null;
    }
}
exports.QA = QA;
