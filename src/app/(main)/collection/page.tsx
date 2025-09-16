import { loadTrashList } from './_data/route.loader';
import View from './_ui/view';

export default async function Collection() {
    const vm = await loadTrashList();
    return <View {...vm} />;
}
