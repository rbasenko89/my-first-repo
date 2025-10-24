"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AQA = void 0;
class AQA {
    constructor(name, primaryStack = 'TS') {
        this.name = name;
        this.primaryStack = primaryStack;
        this.roleName = 'AQA';
    }
    describe() {
        return `${this.name}: ${this.roleName} (${this.primaryStack} stack)`;
    }
    performDuties() {
        return 'Design automation framework, write maintainable tests, CI/CD integration.';
    }
    salary() {
        return { min: 2500, max: 5500, currency: 'EUR' };
    }
    nextStep() {
        return null; // або Manager / Principal AQA — за потреби
    }
}
exports.AQA = AQA;
