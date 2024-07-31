import {ChatImage} from "./chat-image";
import {ChatEvents} from "./chat-events";
import {ChatFiles} from "./chat-files";
import ChatTools from "./chat-tools";
import { Check, Copy } from "lucide-react";
import {ChatSources} from "./chat-sources";
import {SuggestedQuestions} from "./chat-suggested-questions";
import {Fragment} from "react";
import useCopyToClipboard from "./copy-to-clipboard";
import ChatAvatar from "./chat-avatar";
import {Button} from "./button";
import Markdown from "./markdown";

function getAnnotationData(
    annotations,
    type,
) {
    return annotations.filter((a) => a.type === type).map((a) => a.data);
}

function ChatMessageContent({message, isLoading, append}) {
    const annotations = message.annotations;
    if (!annotations?.length) return <Markdown content={message.content} />;

    const imageData = getAnnotationData(
        annotations,
            "image",
    );
    const contentFileData = getAnnotationData(
        annotations,
            "document_file",
    );
    const eventData = getAnnotationData(
        annotations,
           "events",
    );
    const sourceData = getAnnotationData(
        annotations,
            "sources",
    );
    const toolData = getAnnotationData(
        annotations,
            "tools",
    );
    const suggestedQuestionsData = getAnnotationData(
        annotations,
            "annotations",
    );

    const contents = [
        {
            order: 1,
            component: imageData[0] ? <ChatImage data={imageData[0]} /> : null,
        },
        {
            order: -3,
            component:
                eventData.length > 0 ? (
                    <ChatEvents isLoading={isLoading} data={eventData} />
                ) : null,
        },
        {
            order: 2,
            component: contentFileData[0] ? (
                <ChatFiles data={contentFileData[0]} />
            ) : null,
        },
        {
            order: -1,
            component: toolData[0] ? <ChatTools data={toolData[0]} /> : null,
        },
        {
            order: 0,
            component: <Markdown content={message.content} />,
        },
        {
            order: 3,
            component: sourceData[0] ? <ChatSources data={sourceData[0]} /> : null,
        },
        {
            order: 4,
            component: suggestedQuestionsData[0] ? (
                <SuggestedQuestions
                    questions={suggestedQuestionsData[0]}
                    append={append}
                />
            ) : null,
        },
    ];

    return (
        <div className="flex-1 gap-4 flex flex-col">
            {contents
                .sort((a, b) => a.order - b.order)
                .map((content, index) => (
                    <Fragment key={index}>{content.component}</Fragment>
                ))}
        </div>
    );
}

export default function ChatMessage({
                                        chatMessage,
                                        isLoading,
                                        append,
                                    }) {
    const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
    return (
        <div className="flex items-start gap-4 pr-5 pt-5">
            <ChatAvatar role={chatMessage.role} />
            <div className="group flex flex-1 justify-between gap-2">
                <ChatMessageContent
                    message={chatMessage}
                    isLoading={isLoading}
                    append={append}
                />
                <Button
                    onClick={() => copyToClipboard(chatMessage.content)}
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100"
                >
                    {isCopied ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </Button>
            </div>
        </div>
    );
}
