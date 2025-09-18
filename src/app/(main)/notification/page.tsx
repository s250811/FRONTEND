import { loadNotificationsVM } from './_data/route.loader';
import View from './_ui/view';

export default async function Page() {
    const vm = await loadNotificationsVM();
    return <View {...vm} />;
}
