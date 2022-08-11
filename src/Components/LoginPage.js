import React, { useRef } from "react";

function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = () => {};

  return (
    <div>
      <form>
        <input ref={emailRef} name="email" placeholder="email" />
        <input ref={passwordRef} name="password" placeholder="password" />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
