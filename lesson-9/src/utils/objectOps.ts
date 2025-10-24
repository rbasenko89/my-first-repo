import { IProfessional } from '../interfaces/IProfessional';
import { SalaryRange } from '../types/types';

/** Повертає чистий DTO з мінімальними полями */
export function toDTO(p: IProfessional) {
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
export function bumpSalary(range: SalaryRange, delta: number): SalaryRange {
    return { ...range, min: range.min + delta, max: range.max + delta };
}

/** Повертає узагальнену інформацію + опційний nextStep() як текст */
export function summarize(p: IProfessional) {
    const next = p.nextStep();
    return {
        who: p.describe(),
        duties: p.performDuties(),
        next: next ? next.describe() : null
    };
}

/** Глибока копія DTO з патчем (маніпуляція вхідним об’єктом як параметром) */
export function cloneWithPatch<T extends object>(obj: T, patch: Partial<T>): T {
    return { ...(JSON.parse(JSON.stringify(obj)) as T), ...patch };
}
