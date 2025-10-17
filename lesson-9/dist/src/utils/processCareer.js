"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCareer = processCareer;
function processCareer(pro) {
    const sal = pro.salary();
    console.log(`→ ${pro.describe()}`);
    console.log(`   Duties: ${pro.performDuties()}`);
    console.log(`   Salary: ${sal.min}-${sal.max} ${sal.currency}`);
    const next = pro.nextStep();
    if (next) {
        console.log('   Next step suggestion:');
        console.log(`   ${next.describe()}`);
    }
    else {
        console.log('   No further suggested step.');
    }
}
