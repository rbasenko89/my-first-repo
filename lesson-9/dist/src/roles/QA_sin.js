'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.QA_Sin = void 0;
const QA_1 = require('../abstractions/QA');
const types_1 = require('../types/types');
const QA_lead_1 = require('./QA_lead');
class QA_Sin extends QA_1.QA {
    constructor(name, years = 4) {
        super(name, types_1.Level.Sin, years);
    }
    focus() {
        return 'test strategy, non-functional testing, mentoring';
    }
    salary() {
        return { min: 3000, max: 5000, currency: 'EUR' };
    }
    nextStep() {
        return new QA_lead_1.QA_Lead(this.name, Math.max(this.years, 6));
    }
}
exports.QA_Sin = QA_Sin;
