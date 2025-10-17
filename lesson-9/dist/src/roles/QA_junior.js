"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QA_Jun = exports.QA_Junior = void 0;
const QA_1 = require("../abstractions/QA");
const types_1 = require("../types/types");
const QA_mid_1 = require("./QA_mid");
class QA_Junior extends QA_1.QA {
    constructor(name, years = 0) {
        super(name, types_1.Level.Jun, years);
    }
    focus() {
        return 'basic test design, execution, learn processes';
    }
    salary() {
        return { min: 700, max: 1500, currency: 'EUR' };
    }
    nextStep() {
        return new QA_mid_1.QA_Mid(this.name, Math.max(this.years, 2));
    }
}
exports.QA_Junior = QA_Junior;
exports.QA_Jun = QA_Junior;
