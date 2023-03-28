// eslint-disable-next-line no-use-before-define
import * as React from "react";
import { signIn, signOut, useSession, SignInResponse } from "next-auth/react";
import Layout from "../components/layout";

type Response = {
  redirect?: boolean;
  password?: string;
};

export default function Page() {
  const [response, setResponse] = React.useState<SignInResponse | undefined | null>(null);
  const handleLogin = (options: Response) => async () => {
    if (options.redirect) {
      return signIn("credentials", options);
    }
    const response = await signIn("credentials", options)
    setResponse(response);
  };

  const handleLogout = (options: any) => async () => {
    if (options.redirect) {
      return signOut(options)
    }
    const response = await signOut(options)
    setResponse(response)
  };

  const { data: session } = useSession();

  if (session) {
    return (
      <Layout>
        <h1>Test different flows for Credentials logout</h1>
        <span className="spacing">Default:</span>
        <button onClick={handleLogout({ redirect: true })}>Logout</button>
        <br />
        <span className="spacing">No redirect:</span>
        <button onClick={handleLogout({ redirect: false })}>Logout</button>
        <br />
        <p>Response:</p>
        <pre style={{ background: "#eee", padding: 16 }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Test different flows for Credentials login</h1>
      <span className="spacing">Default:</span>
      <button onClick={handleLogin({ redirect: true, password: "pw" })}>
        Login
      </button>
      <br />
      <span className="spacing">No redirect:</span>
      <button onClick={handleLogin({ redirect: false, password: "pw" })}>
        Login
      </button>
      <br />
      <span className="spacing">No redirect, wrong password:</span>
      <button onClick={handleLogin({ redirect: false, password: "" })}>
        Login
      </button>
      <p>Response:</p>
      <pre style={{ background: "#eee", padding: 16 }}>
        {JSON.stringify(response, null, 2)}
      </pre>
    </Layout>
  );
}
