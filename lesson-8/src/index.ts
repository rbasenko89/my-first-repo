import { makeUserCard } from './abstractions.js';
import { fetchUser10, toUserSummary } from './response-api.js';

(async () => {
    const user = await fetchUser10();
    const summary = toUserSummary(user);
    console.log(summary);
    const u = await fetchUser10();
    const card = makeUserCard(u);
    console.log(card);
})();
