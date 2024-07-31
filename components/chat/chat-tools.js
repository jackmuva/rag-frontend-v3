

// TODO: If needed, add displaying more tool outputs here
export default function ChatTools({ data }) {
    if (!data) return null;
    const { toolCall, toolOutput } = data;

    if (toolOutput.isError) {
        return (
            <div className="border-l-2 border-red-400 pl-2">
                There was an error when calling the tool {toolCall.name} with input:{" "}
                <br />
                {JSON.stringify(toolCall.input)}
            </div>
        );
    }
}
