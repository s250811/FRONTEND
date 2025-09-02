import Navigation from "@/components/navigation";
import Vworkspace from "../view/workspace.view";

export default function WorkspaceContainer() {
    return (
        <div className="flex">
            <Navigation />

            <div className="flex-1">
                <Vworkspace />
            </div>
        </div>
    )
}