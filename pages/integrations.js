import { paragon } from '@useparagon/connect';
import Layout from "../components/Layout";
import useParagon from "../hooks/useParagon";
import styles from "../styles/Integrations.module.css";
import {useEffect, useState} from "react";
import jsonwebtoken from "jsonwebtoken";

export default function Integrations({ paragonUserToken }) {
  // const { user } = useParagon(paragonUserToken);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const usr = getLoggedInUser();
        paragon.authenticate(process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID, usr.paragonUserToken);
        setUser(paragon.getUser());
    }, [])

    function generateParagonUserToken(userId) {
        const createdAt = Math.floor(Date.now() / 1000);
        return jsonwebtoken.sign(
            {
                sub: userId,
                iat: createdAt,
                exp: createdAt + 60 * 60,
            },
            process.env.NEXT_PUBLIC_PARAGON_SIGNING_KEY.split(String.raw`\n`).join('\n'),
            { algorithm: "RS256" }
        );
    }

    function getLoggedInUser() {
        const usr = {
            id: "1f45e694-977a-474c-b630-da5c7839ad94",
            name: "Jack Mu",
        };
        usr.paragonUserToken = generateParagonUserToken(usr.id);
        return usr;
    }



  return (
    <Layout title="Integrations">
      <div className={styles.container}>
        {paragon.getIntegrationMetadata().map((integration) => {
          const integrationEnabled = user.authenticated && user.integrations[integration.type]?.enabled;

          return (
            <div key={integration.type} className={styles.row}>
              <img src={integration.icon} style={{ maxWidth: "30px" }} />
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
