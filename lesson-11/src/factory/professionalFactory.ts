import type { IProfessional } from '../interfaces/IProfessional';
import { AQA } from '../roles/AQA';
import { ExitIT } from '../roles/ExitIT';
import { Manager } from '../roles/Manager';
import { QA_Junior } from '../roles/QA_junior';
import { QA_Lead } from '../roles/QA_lead';
import { QA_Mid } from '../roles/QA_mid';
import { QA_Sin } from '../roles/QA_sin';

export type PersonDTO = {
    name: string;
    path: 'QA_Jun' | 'QA_Mid' | 'QA_Sin' | 'QA_Lead' | 'AQA' | 'Manager' | 'ExitIT';
    years?: number;
    stack?: 'TS' | 'Py' | 'Java';
    domain?: string;
    destination?: string;
};

export function professionalFactory(dto: PersonDTO): IProfessional {
    switch (dto.path) {
        case 'QA_Jun':
            return new QA_Junior(dto.name, dto.years ?? 0);
        case 'QA_Mid':
            return new QA_Mid(dto.name, dto.years ?? 2);
        case 'QA_Sin':
            return new QA_Sin(dto.name, dto.years ?? 4);
        case 'QA_Lead':
            return new QA_Lead(dto.name, dto.years ?? 6);
        case 'AQA':
            return new AQA(dto.name, dto.stack ?? 'TS');
        case 'Manager':
            return new Manager(dto.name, dto.domain ?? 'Delivery');
        case 'ExitIT':
            return new ExitIT(dto.name, dto.destination ?? 'Entrepreneurship');
        default: {
            const exhaustive: never = dto.path as never;
            throw new Error(`Unknown path: ${exhaustive}`);
        }
    }
}
