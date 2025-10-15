import { UserSummary } from './response-api.js';
import { User } from './user-interface.js';

//карта юзера для простішого відображення
export type UserCard = {
    id: number;
    title: string; // "Full Name (@username)"
    subtitle: string; // "email · Company"
    location: string; // city
    metrics: {
        phoneDigitsCount: number;
        geoAbsSum: number;
    };
};
//абстракція і метод (дані на вхід для обробки і вихід)
export abstract class Transformer<In, Out> {
    transformAll(items: In[]): Out[] {
        return items.map((i) => this.transform(i));
    }
    abstract transform(input: In): Out;
}

// з юзера отримуємо необхідне Summary
export class UserToSummary extends Transformer<User, UserSummary> {
    transform(input: User): UserSummary {
        // композиція: делегуємо збір похідних полів у конструктор класу UserSummary
        return new UserSummary(input);
    }
}

// трансформуємо саммері в інший вигляд
export class SummaryToCard extends Transformer<UserSummary, UserCard> {
    transform(s: UserSummary): UserCard {
        return {
            id: s.id,
            title: `${s.fullName} (@${s.username})`,
            subtitle: `${s.email} · ${s.companyName}`,
            location: s.city,
            metrics: {
                phoneDigitsCount: s.phoneDigitsCount,
                geoAbsSum: s.geoAbsSum
            }
        };
    }
}

export class Pipeline<A, B, C> extends Transformer<A, C> {
    constructor(
        private readonly first: Transformer<A, B>,
        private readonly second: Transformer<B, C>
    ) {
        super();
    }
    transform(input: A): C {
        const mid = this.first.transform(input);
        return this.second.transform(mid);
    }
}

export const userToCard = new Pipeline<User, UserSummary, UserCard>(new UserToSummary(), new SummaryToCard());

export function makeUserCard(user: User): UserCard {
    return userToCard.transform(user);
}
