import { processCareer, type CareerSnapshot } from '../../src/utils/processCareer';
import * as factoryModule from '../../src/factory/professionalFactory';
import type { IProfessional } from '../../src/interfaces/IProfessional';
import { SalaryRange } from '../../src/types/types';
import * as objectOps from '../../src/utils/objectOps';

//Допоміжна фабрика для моків IProfessional
function makeProMock(overrides: Partial<IProfessional> = {}): IProfessional {
    const baseSalary: SalaryRange = { min: 1000, max: 2000, currency: 'EUR' };
    const nextMock: IProfessional | null = null;

    return {
        name: 'Mocky',
        roleName: 'QA',
        describe: jest.fn().mockReturnValue('Mocky: QA'),
        performDuties: jest.fn().mockReturnValue('Testing duties...'),
        salary: jest.fn().mockReturnValue(baseSalary),
        nextStep: jest.fn().mockReturnValue(nextMock),
        ...overrides
    };
}

describe('Jest mocks for functions & objects', () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    test('1) processCareer з обʼєкт-моком (nextStep=null) повертає snapshot і викликає методи', () => {
        const pro = makeProMock();
        const spyLog = jest.spyOn(console, 'log').mockImplementation(() => {});

        const snap: CareerSnapshot = processCareer(pro);

        expect(snap.description).toBe('Mocky: QA');
        expect(snap.duties).toBe('Testing duties...');
        expect(snap.salary).toEqual({ min: 1000, max: 2000, currency: 'EUR' });
        expect(snap.nextDescription).toBeNull();

        expect(pro.describe).toHaveBeenCalledTimes(1);
        expect(pro.performDuties).toHaveBeenCalledTimes(1);
        expect(pro.salary).toHaveBeenCalledTimes(1);
        expect(pro.nextStep).toHaveBeenCalledTimes(1);

        // перевіримо, що щось логувалось
        expect(spyLog).toHaveBeenCalled();
    });

    test('2) processCareer коли nextStep повертає інший обʼєкт-мок', () => {
        const next = makeProMock({
            describe: jest.fn().mockReturnValue('Next Person: Manager'),
            roleName: 'Manager'
        });

        const pro = makeProMock({
            nextStep: jest.fn().mockReturnValue(next)
        });

        const snap = processCareer(pro);

        expect(snap.nextDescription).toBe('Next Person: Manager');
        expect(pro.nextStep as jest.Mock).toHaveBeenCalledTimes(1);
        expect(next.describe as jest.Mock).toHaveBeenCalledTimes(1);
    });

    test('3) spyOn на функцію bumpSalary: ідемпотентність вхідного обʼєкта', () => {
        const range: SalaryRange = { min: 1500, max: 2500, currency: 'EUR' };
        const spy = jest.spyOn(objectOps, 'bumpSalary');

        const out = objectOps.bumpSalary(range, 300);

        expect(spy).toHaveBeenCalledWith(range, 300);
        expect(out).toEqual({ min: 1800, max: 2800, currency: 'EUR' });
        expect(out).not.toBe(range); // не мутуємо оригінал
        // оригінал незмінний
        expect(range).toEqual({ min: 1500, max: 2500, currency: 'EUR' });
    });

    test('4) мок модуля factory: підмінимо professionalFactory і перевіримо інтеграцію з processCareer', () => {
        const mockedReturn: IProfessional = makeProMock({
            describe: jest.fn().mockReturnValue('Ira: QA Lead'),
            performDuties: jest.fn().mockReturnValue('Leading QA...'),
            salary: jest.fn().mockReturnValue({ min: 5000, max: 8000, currency: 'EUR' }),
            nextStep: jest.fn().mockReturnValue(null)
        });

        const spyFactory = jest.spyOn(factoryModule, 'professionalFactory').mockReturnValue(mockedReturn);

        // "клієнтський" код, який ми тестуємо з мокнутим factory
        function produceViaFactory(dto: factoryModule.PersonDTO): CareerSnapshot {
            const pro = factoryModule.professionalFactory(dto);
            return processCareer(pro);
        }

        const dto: factoryModule.PersonDTO = { name: 'Ira', path: 'QA_Lead', years: 8 };
        const snap = produceViaFactory(dto);

        expect(spyFactory).toHaveBeenCalledWith(dto);
        expect(snap.description).toBe('Ira: QA Lead');
        expect(snap.salary).toEqual({ min: 5000, max: 8000, currency: 'EUR' });
    });

    test('5) мок console.log: перевірка формату виводу', () => {
        const pro = makeProMock({
            describe: jest.fn().mockReturnValue('Mocky: QA Senior'),
            performDuties: jest.fn().mockReturnValue('Strategy & mentoring'),
            salary: jest.fn().mockReturnValue({ min: 3000, max: 5000, currency: 'EUR' })
        });

        const spyLog = jest.spyOn(console, 'log').mockImplementation(() => {});
        processCareer(pro);

        // базово 3-4 виклики логу (опис, duties, salary, next/no-next)
        expect(spyLog.mock.calls.length).toBeGreaterThanOrEqual(3);
        // перевіримо один з рядків
        const flat = spyLog.mock.calls.map((c) => c.join(' ')).join('\n');
        expect(flat).toMatch(/Mocky: QA Senior/);
        expect(flat).toMatch(/Salary: 3000-5000 EUR/);
    });

    test('6) toDTO працює з обʼєкт-моком і викликає потрібні методи', () => {
        const pro = makeProMock({
            describe: jest.fn().mockReturnValue('Dmytro: AQA (TS)'),
            salary: jest.fn().mockReturnValue({ min: 2500, max: 5500, currency: 'EUR' })
        });

        const dto = objectOps.toDTO(pro);
        expect(dto).toEqual({
            name: 'Mocky',
            role: 'QA',
            salaryMin: 2500,
            salaryMax: 5500,
            currency: 'EUR',
            description: 'Dmytro: AQA (TS)'
        });

        expect(pro.describe).toHaveBeenCalledTimes(1);
        expect(pro.salary).toHaveBeenCalledTimes(1);
    });
});
