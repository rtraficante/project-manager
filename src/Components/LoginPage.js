import { useAuth0 } from "@auth0/auth0-react";
import React, { useRef } from "react";

function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { loginWithRedirect } = useAuth0();

  const handleSubmit = () => {};

  return (
    <div>
      <form>
        <input ref={emailRef} name="email" placeholder="email" />
        <input ref={passwordRef} name="password" placeholder="password" />
        <button onClick={() => loginWithRedirect()}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
