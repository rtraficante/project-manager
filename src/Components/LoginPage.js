import React, { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router";
import { client } from "../index";
import { LOGIN, REGISTER } from "../graphql/mutations/user";

function LoginPage() {
  const [loginState, setLoginState] = useState("login");
  const [loginUser, { data: loginData }] = useMutation(LOGIN);
  const [registerUser, { data: registerData }] = useMutation(REGISTER);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({
      variables: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    }).then(() => client.resetStore());
    navigate("/");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    registerUser({
      variables: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    }).then(() => client.resetStore());
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col items-center m-auto">
      <div className="mt-8">
        <h2 className="font-bold text-4xl">Bug Tracker</h2>
      </div>
      {loginState === "login" ? (
        <Login
          handleLogin={handleLogin}
          emailRef={emailRef}
          passwordRef={passwordRef}
          setLoginState={setLoginState}
          loginData={loginData}
        />
      ) : (
        <Register
          handleRegister={handleRegister}
          emailRef={emailRef}
          passwordRef={passwordRef}
          setLoginState={setLoginState}
          registerData={registerData}
        />
      )}
    </div>
  );
}

export default LoginPage;
