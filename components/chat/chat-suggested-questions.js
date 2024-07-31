import {useState} from "react";

export function SuggestedQuestions({
                                       questions,
                                       append,
                                   }) {
    const [showQuestions, setShowQuestions] = useState(questions.length > 0);

    return (
        showQuestions &&
        append !== undefined && (
            <div className="flex flex-col space-y-2">
                {questions.map((question, index) => (
                    <a
                        key={index}
                        onClick={() => {
                            append({ role: "user", content: question });
                            setShowQuestions(false);
                        }}
                        className="text-sm italic hover:underline cursor-pointer"
                    >
                        {"->"} {question}
                    </a>
                ))}
            </div>
        )
    );
}
