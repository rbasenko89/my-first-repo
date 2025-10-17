"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDTO = toDTO;
exports.bumpSalary = bumpSalary;
exports.summarize = summarize;
exports.cloneWithPatch = cloneWithPatch;
/** Повертає чистий DTO з мінімальними полями */
function toDTO(p) {
    const s = p.salary();
    return {
        name: p.name,
        role: p.roleName,
        salaryMin: s.min,
        salaryMax: s.max,
        currency: s.currency,
        description: p.describe()
    };
}
/** Створює новий об’єкт зарплати з дельтою (не мутує оригінал) */
function bumpSalary(range, delta) {
    return { ...range, min: range.min + delta, max: range.max + delta };
}
/** Повертає узагальнену інформацію + опційний nextStep() як текст */
function summarize(p) {
    const next = p.nextStep();
    return {
        who: p.describe(),
        duties: p.performDuties(),
        next: next ? next.describe() : null
    };
}
/** Глибока копія DTO з патчем (маніпуляція вхідним об’єктом як параметром) */
function cloneWithPatch(obj, patch) {
    return { ...JSON.parse(JSON.stringify(obj)), ...patch };
}
