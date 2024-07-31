
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {useClientConfig} from "../../hooks/use-config";


const docMineTypeMap = {
    "text/csv": "csv",
    "application/pdf": "pdf",
    "text/plain": "txt",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
};

export function useFile() {
    const { backend } = useClientConfig();
    const [imageUrl, setImageUrl] = useState(null);
    const [files, setFiles] = useState([]);

    const docEqual = (a, b) => {
        if (a.id === b.id) return true;
        if (a.filename === b.filename && a.filesize === b.filesize) return true;
        return false;
    };

    const addDoc = (file) => {
        const existedFile = files.find((f) => docEqual(f, file));
        if (!existedFile) {
            setFiles((prev) => [...prev, file]);
            return true;
        }
        return false;
    };

    const removeDoc = (file) => {
        setFiles((prev) => prev.filter((f) => f.id !== file.id));
    };

    const reset = () => {
        imageUrl && setImageUrl(null);
        files.length && setFiles([]);
    };

    const uploadContent = async (base64) => {
        const uploadAPI = `${backend}/api/chat/upload`;
        const response = await fetch(uploadAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                base64,
            }),
        });
        if (!response.ok) throw new Error("Failed to upload document.");
        return await response.json();
    };

    const getAnnotations = () => {
        const annotations = [];
        if (imageUrl) {
            annotations.push({
                type: "image",
                data: { url: imageUrl },
            });
        }
        if (files.length > 0) {
            annotations.push({
                type: "document_file",
                data: { files },
            });
        }
        return annotations;
    };

    const readContent = async (input) => {
        const { file, asUrl } = input;
        const content = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            if (asUrl) {
                reader.readAsDataURL(file);
            } else {
                reader.readAsText(file);
            }
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
        return content;
    };

    const uploadFile = async (file) => {
        if (file.type.startsWith("image/")) {
            const base64 = await readContent({ file, asUrl: true });
            return setImageUrl(base64);
        }

        const filetype = docMineTypeMap[file.type];
        if (!filetype) throw new Error("Unsupported document type.");
        const newDoc = {
            id: uuidv4(),
            filetype,
            filename: file.name,
            filesize: file.size,
        };
        switch (file.type) {
            case "text/csv": {
                const content = await readContent({ file });
                return addDoc({
                    ...newDoc,
                    content: {
                        type: "text",
                        value: content,
                    },
                });
            }
            default: {
                const base64 = await readContent({ file, asUrl: true });
                const ids = await uploadContent(base64);
                return addDoc({
                    ...newDoc,
                    content: {
                        type: "ref",
                        value: ids,
                    },
                });
            }
        }
    };

    return {
        imageUrl,
        setImageUrl,
        files,
        removeDoc,
        reset,
        getAnnotations,
        uploadFile,
    };
}
