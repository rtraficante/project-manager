import React from "react";

function Register({
  handleRegister,
  emailRef,
  passwordRef,
  setLoginState,
  registerData,
  firstNameRef,
  lastNameRef,
  usernameRef,
}) {
  return (
    <div className="mt-12 p-8 py-12 w-full max-w-[400px] bg-white rounded shadow-md">
      <h4 className="text-center font-bold text-gray-600 mb-6">
        Sign up for your account
      </h4>
      {registerData?.register.errors ? (
        <div className="bg-red-800 rounded-md shadow-md py-2 px-4 mb-4">
          {registerData.register.errors.map((error, i) => (
            <p className=" text-white" key={i}>
              <strong>Error:</strong> {error.message}
            </p>
          ))}
        </div>
      ) : null}
      <form onSubmit={handleRegister} className="flex flex-col space-y-4">
        <input
          ref={firstNameRef}
          name="firstName"
          placeholder="Enter first name"
          className="p-2 rounded-md border-2"
        />
        <input
          ref={lastNameRef}
          name="lastName"
          placeholder="Enter last name"
          className="p-2 rounded-md border-2"
        />
        <input
          ref={usernameRef}
          name="username"
          placeholder="Enter username"
          className="p-2 rounded-md border-2"
        />
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
          className="w-full bg-blue-400 text-white p-2 rounded-md text-lg"
        >
          Sign up
        </button>
      </form>
      <hr className="mt-8 bg-black" />
      <div className="mt-8">
        <p className="text-center">
          Already have an account?{" "}
          <button
            onClick={() => setLoginState("login")}
            className="text-blue-800 hover:underline"
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
