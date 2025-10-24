"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QA_Mid = void 0;
const QA_1 = require("../abstractions/QA");
const types_1 = require("../types/types");
const QA_sin_1 = require("./QA_sin");
class QA_Mid extends QA_1.QA {
    constructor(name, years = 2) {
        super(name, types_1.Level.Mid, years);
    }
    focus() {
        return 'E2E scenarios, risk-based testing, test data design';
    }
    salary() {
        return { min: 1500, max: 3000, currency: 'EUR' };
    }
    nextStep() {
        return new QA_sin_1.QA_Sin(this.name, Math.max(this.years, 4));
    }
}
exports.QA_Mid = QA_Mid;
