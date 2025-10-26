import { IProfessional } from '../interfaces/IProfessional';
import { SalaryRange } from '../types/types';

// Повертає компактний DTO з обʼєкта IProfessional
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

//Створює НОВИЙ діапазон зарплати з дельтою
export function bumpSalary(range: SalaryRange, delta: number): SalaryRange {
    return { ...range, min: range.min + delta, max: range.max + delta };
}

//Узагальнення з можливим nextStep() як текст
export function summarize(p: IProfessional) {
    const next = p.nextStep();
    return {
        who: p.describe(),
        duties: p.performDuties(),
        next: next ? next.describe() : null
    };
}

//Глибока копія + патч
export function cloneWithPatch<T extends object>(obj: T, patch: Partial<T>): T {
    return { ...(JSON.parse(JSON.stringify(obj)) as T), ...patch };
}
