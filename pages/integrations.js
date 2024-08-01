import { paragon } from '@useparagon/connect';
import Layout from "../components/Layout";
import styles from "../styles/Integrations.module.css";
import {useEffect, useState} from "react";
import jsonwebtoken from "jsonwebtoken";
import Login from "../components/login";

export default function Integrations() {
    const [user, setUser] = useState(null);
    const [integrationMetadata, setIntegrationMetadata] = useState([]);

    useEffect(() => {
        if(sessionStorage.getItem("jwt")){
            paragon.authenticate(process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID, sessionStorage.getItem("jwt"));
            setUser(paragon.getUser());
        }
    }, [])

    useEffect(() => {
        setIntegrationMetadata(paragon.getIntegrationMetadata());
    }, [user])

    if(user == null && sessionStorage.getItem("jwt") == null){
        return (
            <Layout title="Integrations">
                <Login setUser={setUser}/>
            </Layout>
        );
    }else {
        if(user == null){
            return(<div>LOADING...</div>)
        }
        else {
            return (
                <Layout title="Integrations">
                    <div className={styles.container}>
                        {integrationMetadata.map((integration) => {
                            const integrationEnabled = user.authenticated && user.integrations[integration.type]?.enabled;
                            return (
                                <div key={integration.type} className={styles.row}>
                                    <img src={integration.icon} style={{maxWidth: "30px"}}/>
                                    <p>{integration.name}</p>

                                    <button onClick={() => paragon.connect(integration.type)}>
                                        {integrationEnabled ? "Manage" : "Enable"}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </Layout>
            );
        }
    }
}
