import { User2 } from "lucide-react";

export default function ChatAvatar({ role }) {
    if (role === "user") {
        return (
            <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
                <User2 className="h-4 w-4" />
            </div>
        );
    }

    return (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-black text-white shadow">
            <img
                className="rounded-md h-24 w-24"
                src="../../public/llama.png"
                alt="Llama Logo"
                priority
            />
        </div>
    );
}
