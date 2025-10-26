'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.QA_Lead = void 0;
const QA_1 = require('../abstractions/QA');
const types_1 = require('../types/types');
const Manager_1 = require('./Manager');
class QA_Lead extends QA_1.QA {
    constructor(name, years = 6) {
        super(name, types_1.Level.Lead, years);
    }
    focus() {
        return 'quality leadership, metrics, release governance, coaching';
    }
    salary() {
        return { min: 5000, max: 8000, currency: 'EUR' };
    }
    nextStep() {
        return new Manager_1.Manager(this.name, 'QA Chapter');
    }
}
exports.QA_Lead = QA_Lead;
