const user = {
    _firstName: 'Ramella',
    _lastName: 'Basenko',
    birthYear: 1989,
    contact: {
        email: 'ramellabasenko@gmail.com',
        phone: '+48 600 000 000'
    },

    location: {
        country: 'Poland',
        city: 'Kraków'
    },

    stats: {
        purchases: 2,
        totalSpent: 3500
    },

    preferences: {
        newsletter: true,
        language: 'pl'
    },

    get fullName() {
        return `${this._firstName} ${this._lastName}`;
    },

    set fullName(value) {
        if (typeof value !== 'string' || !value.trim().includes(' ')) {
            console.warn("fullName має містити ім'я та прізвище через пробіл");
            return;
        }
        const [first, ...rest] = value.trim().split(/\s+/);
        this._firstName = first;
        this._lastName = rest.join(' ');
    },

    get age() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.birthYear;
    },

    set city(newCity) {
        if (!newCity || typeof newCity !== 'string') {
            console.warn('Місто має бути непорожнім рядком');
            return;
        }
        this.location.city = newCity.trim();
    },

    get maskedEmail() {
        const [name, domain] = this.contact.email.split('@');
        if (!name || !domain) return this.contact.email;
        const masked = name.length <= 2 ? name[0] + '*' : name[0] + '*'.repeat(name.length - 2) + name.slice(-1);
        return `${masked}@${domain}`;
    },

    addPurchase(amount) {
        const num = Number(amount);
        if (!Number.isFinite(num) || num <= 0) {
            console.warn('Сума покупки має бути додатним числом');
            return;
        }
        this.stats.purchases += 1;
        this.stats.totalSpent += num;
    },

    toggleNewsletter() {
        this.preferences.newsletter = !this.preferences.newsletter;
    },

    summary() {
        return [
            `Користувач: ${this.fullName} (${this.age} р.)`,
            `Локація: ${this.location.city}, ${this.location.country}`,
            `Email (маск.): ${this.maskedEmail}`,
            `Покупок: ${this.stats.purchases}, витрачено: ${this.stats.totalSpent} PLN`,
            `Розсилка: ${this.preferences.newsletter ? 'увімкнено' : 'вимкнено'}`,
            ` Мова: ${this.preferences.language}`
        ].join('\n');
    }
};

console.log("Ім'я:", user.fullName);
user.fullName = 'Anna Kowalska';
user.city = 'Gdańsk';
user.addPurchase(799.99);
user.toggleNewsletter();

console.log('\n==== USER SUMMARY ====');
console.log(user.summary());
