import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/Header/AuthHeader";
import banner from "../assets/images/banner2.jpg";
import { checkValidData } from "../utils/validate";
import * as authApi from "../services/authApi";

function Login() {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const toggleSignInForm = () => {
    setIsSignInForm((current) => !current);
    setErrorMessage("");
  };

  const handleButtonClicked = async () => {
    const message = checkValidData(email, password);

    if (message) {
      setErrorMessage(message);
      return;
    }

    if (!isSignInForm && !fullName.trim()) {
      setErrorMessage("Full name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      if (isSignInForm) {
        await authApi.login({ email, password });
        navigate("/browse", { replace: true });
        return;
      }

      await authApi.register({
        fullName: fullName.trim(),
        email,
        password,
      });

      setIsSignInForm(true);
      setPassword("");
      setErrorMessage("Registration successful. Please sign in.");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <img
        src={banner}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-black/35" />

      <AuthHeader />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleButtonClicked();
        }}
        className="absolute left-1/2 top-24 z-10 w-[92%] max-w-md -translate-x-1/2 rounded-lg bg-black/80 p-10 text-white sm:top-32 sm:p-12"
      >
        <h1 className="py-4 text-3xl font-bold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="my-3 w-full rounded bg-gray-700 p-4"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          className="my-3 w-full rounded bg-gray-700 p-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          className="my-3 w-full rounded bg-gray-700 p-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isSignInForm ? "current-password" : "new-password"}
        />

        {!isSignInForm && (
          <p className="mt-1 text-xs text-gray-400">
            At least 6 characters, with uppercase, lowercase, and a number.
          </p>
        )}

        {errorMessage && (
          <p className="py-2 text-sm font-semibold text-red-400">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="my-4 w-full rounded-lg bg-red-700 p-4 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Please wait..."
            : isSignInForm
              ? "Sign In"
              : "Sign Up"}
        </button>

        <p className="cursor-pointer py-4 text-gray-300" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now."
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
}

export default Login;
