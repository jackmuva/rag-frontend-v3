import { useChat } from "ai/react";
import {useClientConfig} from "../hooks/use-config";
import ChatMessages from "./chat/chat-messages";
import ChatInput from "./chat/chat-input";

export default function ChatSection() {
    const { backend } = useClientConfig();
    const {
        messages,
        input,
        isLoading,
        handleSubmit,
        handleInputChange,
        reload,
        stop,
        append,
        setInput,
    } = useChat({
        api: `${backend}/api/chat`,
        headers: {
            "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
        },
        onError: (error) => {
            if (!(error instanceof Error)) throw error;
            const message = JSON.parse(error.message);
            alert(message.detail);
        },
    });

    return (
        <div className="space-y-4 w-full h-full flex flex-col">
            <ChatMessages
                messages={messages}
                isLoading={isLoading}
                reload={reload}
                stop={stop}
                append={append}
            />
            <ChatInput
                input={input}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                isLoading={isLoading}
                messages={messages}
                append={append}
                setInput={setInput}
            />
        </div>
    );
}