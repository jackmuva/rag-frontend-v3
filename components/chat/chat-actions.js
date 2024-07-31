import { PauseCircle, RefreshCw } from "lucide-react";
import {Button} from "./button";

export default function ChatActions({showStop, reload, stop, showReload}
) {
    return (
        <div className="space-x-4">
            {showStop && (
                <Button variant="outline" size="sm" onClick={stop}>
                    <PauseCircle className="mr-2 h-4 w-4" />
                    Stop generating
                </Button>
            )}
            {showReload && (
                <Button variant="outline" size="sm" onClick={reload}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate
                </Button>
            )}
        </div>
    );
}
