'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Manager = void 0;
class Manager {
    constructor(name, domain = 'Delivery') {
        this.name = name;
        this.domain = domain;
        this.roleName = 'Manager';
    }
    describe() {
        return `${this.name}: ${this.roleName} (${this.domain})`;
    }
    performDuties() {
        return 'People management, budgeting, hiring, roadmaps, aligning stakeholders.';
    }
    salary() {
        return { min: 4500, max: 9000, currency: 'EUR' };
    }
    nextStep() {
        return null;
    }
}
exports.Manager = Manager;
