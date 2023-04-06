import React, { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
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
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      variables: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    }).then(() => client.resetStore());

    if (response[0].data.me) {
      navigate("/");
    }
  };

  const handleDemoLogin = async () => {
    const response = await loginUser({
      variables: {
        email: "demotest@demo.com",
        password: "demotest",
      },
    }).then(() => client.resetStore());

    if (response[0].data.me) {
      navigate("/");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await registerUser({
      variables: {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    }).then(() => client.resetStore());
    if (response[0].data.me) {
      navigate("/");
    }
  };

  return (
    <div className="w-full flex flex-col items-center m-auto">
      <div className="self-start m-4">
        <button
          onClick={handleDemoLogin}
          className="bg-blue-800 font-medium text-white p-4 rounded-md shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-150 ease-in-out"
        >
          Log into Demo Account
        </button>
      </div>
      <div className="mt-8">
        <h2 className="font-bold text-4xl text-white">taskform.</h2>
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
          firstNameRef={firstNameRef}
          lastNameRef={lastNameRef}
          usernameRef={usernameRef}
          setLoginState={setLoginState}
          registerData={registerData}
        />
      )}
    </div>
  );
}

export default LoginPage;
