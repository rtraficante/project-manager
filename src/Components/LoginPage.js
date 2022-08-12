import React, { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        field
        message
      }
      user {
        id
        email
      }
    }
  }
`;

const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      errors {
        field
        message
      }
      user {
        id
        email
      }
    }
  }
`;

function LoginPage() {
  const [loginState, setLoginState] = useState("login");
  const [loginUser, { data: loginData }] = useMutation(LOGIN);
  const [registerUser, { data: registerData }] = useMutation(REGISTER);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({
      variables: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    registerUser({
      variables: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    });
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
