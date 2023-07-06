import { useAddress, useAuth, useMetamask } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const auth = useAuth();
  const address = useAddress();
  const connect = useMetamask();
  const { data: session } = useSession();

  const [secret, setSecret] = useState();

  // Hit our example secret endpoint to show the flow for using an authenticated endpoint
  const getSecret = async () => {
    const res = await fetch("/api/secret");
    const data = await res.json();
    setSecret(data);
  };

  const loginWithWallet = async () => {
    // Get the sign-in with ethereum login payload
    const payload = await auth?.login();
    // Use the payload to sign-in via our wallet based credentials provider
    await signIn("credentials", {
      payload: JSON.stringify(payload),
      redirect: false,
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.iconContainer}>
          <Image
            className={styles.icon}
            src="/thirdweb.png"
            alt="thirdweb icon"
            width={100}
            height={100}
          />
          <Image
            className={styles.icon}
            src="/next-auth.png"
            alt="next auth icon"
            width={100}
            height={100}
          />
        </div>

        <h1 className={styles.h1}>thirdweb + Next Auth</h1>

        <p className={styles.explain}>
          In this flow, you can login to a Next Auth backend using either Google
          OAuth, or login with wallet via thirdweb Auth. They are both
          compatible with the same system.
        </p>

        <div className={styles.stack}>
          {!!session ? (
            <button onClick={() => signOut()} className={styles.mainButton}>
              Logout
            </button>
          ) : address ? (
            <>
              <button
                onClick={() => signIn("google")}
                className={styles.mainButton}
              >
                Login with Google
              </button>
              <button
                onClick={() => loginWithWallet()}
                className={styles.mainButton}
              >
                Login with Wallet
              </button>
            </>
          ) : (
            <button onClick={() => connect()} className={styles.mainButton}>
              Connect Wallet
            </button>
          )}
          <button onClick={getSecret} className={styles.mainButton}>
            Get Secret
          </button>
        </div>

        <hr className={styles.divider} />

        <h2>Information</h2>

        <p>
          <b>Conencted Wallet: </b>
          {address}
        </p>

        <p>
          <b>User: </b>
          {JSON.stringify(session?.user || "N/A")}
        </p>

        <p>
          <b>Secret: </b>
          {JSON.stringify(secret || "N/A")}
        </p>
      </div>
    </div>
  );
};

export default Home;
