import {useEffect, useRef} from "react";
import {useClientConfig} from "../../hooks/use-config";
import ChatMessage from "./chat-message";
import {Loader2} from "lucide-react";
import {Button} from "./button";
import ChatActions from "./chat-actions";

export default function ChatMessages({messages, isLoading, reload, append, stop}) {
    const { starterQuestions } = useClientConfig();
    const scrollableChatContainerRef = useRef(null);
    const messageLength = messages.length;
    const lastMessage = messages[messageLength - 1];

    const scrollToBottom = () => {
        if (scrollableChatContainerRef.current) {
            scrollableChatContainerRef.current.scrollTop =
                scrollableChatContainerRef.current.scrollHeight;
        }
    };

    const isLastMessageFromAssistant =
        messageLength > 0 && lastMessage?.role !== "user";
    const showReload =
        reload && !isLoading && isLastMessageFromAssistant;
    const showStop = stop && isLoading;

    // `isPending` indicate
    // that stream response is not yet received from the server,
    // so we show a loading indicator to give a better UX.
    const isPending = isLoading && !isLastMessageFromAssistant;

    useEffect(() => {
        scrollToBottom();
    }, [messageLength, lastMessage]);

    return (
        <div
            className="flex-1 w-full rounded-xl bg-white p-4 shadow-xl relative overflow-y-auto"
            ref={scrollableChatContainerRef}
        >
            <div className="flex flex-col gap-5 divide-y">
                {messages.map((m, i) => {
                    const isLoadingMessage = i === messageLength - 1 && isLoading;
                    return (
                        <ChatMessage
                            key={m.id}
                            chatMessage={m}
                            isLoading={isLoadingMessage}
                            append={append}
                        />
                    );
                })}
                {isPending && (
                    <div className="flex justify-center items-center pt-10">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                )}
            </div>
            {(showReload || showStop) && (

                <div className="flex justify-end py-4">
                    <ChatActions
                        reload={reload}
                        stop={stop}
                        showReload={showReload}
                        showStop={showStop}
                    />
                </div>
            )}
            {!messageLength && starterQuestions?.length && append && (
                <div className="absolute bottom-6 left-0 w-full">
                    <div className="grid grid-cols-2 gap-2 mx-20">
                        {starterQuestions.map((question, i) => (
                            <Button
                                variant="outline"
                                key={i}
                                onClick={() =>
                                    append({ role: "user", content: question })
                                }
                            >
                                {question}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
