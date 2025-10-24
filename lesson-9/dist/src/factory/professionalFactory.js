"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.professionalFactory = professionalFactory;
const AQA_1 = require("../roles/AQA");
const ExitIT_1 = require("../roles/ExitIT");
const Manager_1 = require("../roles/Manager");
const QA_junior_1 = require("../roles/QA_junior");
const QA_lead_1 = require("../roles/QA_lead");
const QA_mid_1 = require("../roles/QA_mid");
const QA_sin_1 = require("../roles/QA_sin");
function professionalFactory(dto) {
    switch (dto.path) {
        case 'QA_Jun':
            return new QA_junior_1.QA_Junior(dto.name, dto.years ?? 0);
        case 'QA_Mid':
            return new QA_mid_1.QA_Mid(dto.name, dto.years ?? 2);
        case 'QA_Sin':
            return new QA_sin_1.QA_Sin(dto.name, dto.years ?? 4);
        case 'QA_Lead':
            return new QA_lead_1.QA_Lead(dto.name, dto.years ?? 6);
        case 'AQA':
            return new AQA_1.AQA(dto.name, dto.stack ?? 'TS');
        case 'Manager':
            return new Manager_1.Manager(dto.name, dto.domain ?? 'Delivery');
        case 'ExitIT':
            return new ExitIT_1.ExitIT(dto.name, dto.destination ?? 'Entrepreneurship');
        default: {
            const exhaustive = dto.path;
            throw new Error(`Unknown path: ${exhaustive}`);
        }
    }
}
