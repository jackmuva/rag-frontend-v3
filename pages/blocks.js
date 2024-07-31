import styles from "../styles/Integrations.module.css";
import {paragon} from "@useparagon/connect";
import Layout from "../components/Layout";
import {useEffect, useState} from "react";

export default function Blocks() {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        async function getData(){
            const response = await fetch(`https://rag.trtlmail-rest.com/api/getAll`, { cache: 'no-store' }).then(data => data.json());
            const data = response.response;
            setBlocks(data);
        }
         getData();
    })
    return (
        <Layout title="Blocks">
            <div className="todoapp w-1/2 ml-96 p-8 place-self-center">
                {blocks.map((block) => {
                    // Check the user state if this integration is enabled for the user
                    return (
                        <div key={block.blockId} className={styles.row}>
                            <p>{block.text}</p>
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
}