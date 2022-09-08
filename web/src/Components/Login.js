import React from "react";

function Login({
  handleLogin,
  emailRef,
  passwordRef,
  setLoginState,
  loginData,
}) {
  return (
    <div className="mt-12 p-8 py-12 w-full max-w-[400px] bg-white rounded shadow-md">
      <h4 className="text-center font-bold text-gray-600 mb-6">
        Log in to Project Management
      </h4>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        {loginData?.login.errors ? (
          <div className="bg-red-800 rounded-md shadow-md py-2 mb-4">
            {loginData.login.errors.map((error, i) => (
              <p className="text-center text-white" key={i}>
                Error: {error.message}
              </p>
            ))}
          </div>
        ) : null}
        <input
          ref={emailRef}
          name="email"
          placeholder="Enter email"
          className="p-2 rounded-md border-2"
        />
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Enter password"
          className="p-2 rounded-md border-2"
        />
        <button
          type="submit"
          className="w-full  bg-blue-800 font-medium text-white p-2 rounded-md shadow-md hover:bg-blue-500 hover:shadow-lg active:bg-blue-600 transition duration-150 ease-in-out"
        >
          Login
        </button>
      </form>
      <hr className="mt-8 bg-black" />
      <div className="mt-8">
        <p className="text-center">
          No account yet?{" "}
          <button
            onClick={() => setLoginState("register")}
            className="text-blue-800 hover:underline"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
