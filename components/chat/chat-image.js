export function ChatImage({ data }) {
    return (
        <div className="rounded-md max-w-[200px] shadow-md">
            <img
                src={data.url}
                className="w-0 h-0 size-4"
                style={{ width: "100%", height: "auto" }}
                alt=""
            />
        </div>
    );
}