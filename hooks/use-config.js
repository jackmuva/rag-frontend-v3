import { useEffect, useMemo, useState } from "react";
export function useClientConfig() {
    const chatAPI = process.env.NEXT_PUBLIC_CHAT_API;
    const [config, setConfig] = useState();

    const backendOrigin = useMemo(() => {
        return chatAPI ? new URL(chatAPI).origin : "";
    }, [chatAPI]);

    const configAPI = `${backendOrigin}/api/chat/config`;

    useEffect(() => {
        fetch(configAPI)
            .then((response) => response.json())
            .then((data) => setConfig({ ...data, chatAPI }))
            .catch((error) => console.error("Error fetching config", error));
    }, [chatAPI, configAPI]);

    return {
        backend: backendOrigin,
        starterQuestions: config?.starterQuestions,
    };
}