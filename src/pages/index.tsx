import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { signIn, signOut, useSession } from "next-auth/react";

function Button() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading</div>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Button />
    </div>
  );
};

export default Home;
