import { User } from './user-interface.js';
//беру останнього юзера який іде з індексом 10 і буду використовувати для подальших операцій

export async function fetchUser10(): Promise<User> {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/10');
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }
    const data = (await res.json()) as User;
    return data;
}

export class UserSummary {
    id: number;
    fullName: string;
    username: string;
    email: string;
    emailDomain: string;
    city: string;
    companyName: string;

    // Похідні поля
    phoneRaw: string;
    phoneDigits: string;
    phoneDigitsCount: number;
    geoLat: number;
    geoLng: number;
    geoAbsSum: number; // умовна "сума" координат з "geo": "lat": "-38.2386", "lng": "57.2232}

    constructor(user: User) {
        // базове
        this.id = user.id;
        this.fullName = user.name;
        this.username = user.username;
        this.email = user.email;
        this.emailDomain = (user.email.split('@')[1] ?? '').toLowerCase();
        this.city = user.address?.city ?? '';
        this.companyName = user.company?.name ?? '';

        // телефон: лишаємо тільки цифри та рахуємо їх
        this.phoneRaw = user.phone ?? '';
        this.phoneDigits = this.phoneRaw.replace(/\D/g, '');
        this.phoneDigitsCount = this.phoneDigits.length;

        // гео-координати: перетворюємо зі string у number та рахуємо умовну "суму"
        this.geoLat = toNum(user.address?.geo?.lat);
        this.geoLng = toNum(user.address?.geo?.lng);
        this.geoAbsSum = Math.abs(this.geoLat) + Math.abs(this.geoLng);
    }
}

function toNum(v?: string): number {
    const n = typeof v === 'string' ? parseFloat(v) : NaN;
    return Number.isFinite(n) ? n : 0;
}

// за допомогою функції повертаємо нового юзера (екземпляр класу)
export function toUserSummary(user: User): UserSummary {
    return new UserSummary(user);
}
