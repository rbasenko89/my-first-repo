"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExitIT = void 0;
class ExitIT {
    constructor(name, destination = 'Entrepreneurship') {
        this.name = name;
        this.destination = destination;
        this.roleName = 'Exited IT';
    }
    describe() {
        return `${this.name}: ${this.roleName} → ${this.destination}`;
    }
    performDuties() {
        return 'Pursuing opportunities outside of IT (business/education/creative).';
    }
    salary() {
        return { min: 0, max: 0, currency: 'EUR' };
    }
    nextStep() {
        return null;
    }
}
exports.ExitIT = ExitIT;
