import type { NextPage } from "next";

import { signIn, signOut, useSession } from "next-auth/react";

function Button() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading</div>;
  }

  if (session) {
    return (
      <>
        Signed in as {JSON.stringify(session)} <br />
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
    <div>
      <Button />
    </div>
  );
};

export default Home;
