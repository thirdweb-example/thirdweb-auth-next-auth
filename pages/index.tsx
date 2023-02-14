import { useAddress, useAuth, useMetamask } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const Home: NextPage = () => {
  const auth = useAuth();
  const address = useAddress();
  const connect = useMetamask();
  const { data: session } = useSession();

  const [secret, setSecret] = useState();

  const getSecret = async () => {
    const res = await fetch("/api/secret");
    const data = await res.json();
    setSecret(data);
  };

  const loginWithWallet = async () => {
    const payload = await auth?.login();
    await signIn("credentials", {
      payload: JSON.stringify(payload),
      redirect: false,
    });
  };

  return (
    <div>
      {!!session ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : address ? (
        <>
          <button onClick={() => signIn("google")}>Login with Google</button>
          <button onClick={() => loginWithWallet()}>Login with Wallet</button>
        </>
      ) : (
        <button onClick={() => connect()}>Connect</button>
      )}
      <button onClick={getSecret}>Get Secret</button>

      <pre>Connected Wallet: {address}</pre>
      <pre>User: {JSON.stringify(session?.user || "N/A", undefined, 2)}</pre>
      <pre>Secret: {JSON.stringify(secret) || "N/A"}</pre>
    </div>
  );
};

export default Home;
