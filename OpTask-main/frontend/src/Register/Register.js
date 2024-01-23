import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import "./Register.css";
import LogoImage from "../Images/OpTask.png";
import { toast } from "react-toastify";

const Register = () => {
  let [nameValue, setNameValue] = useState("");
  let [emailValue, setEmailValue] = useState("");
  let [passwordValue, setPasswordValue] = useState("");
  let [registerStatus, setRegisterStatus] = useState(false);

  // event handlers
  let handleNameChange = (event) => {
    setNameValue(event.target.value);
  };
  let handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };
  let handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userFullName: nameValue,
        userEmail: emailValue,
        userPassword: passwordValue,
      }),
    });

    // console.log(nameValue);
    const parsedRes = await res.json();
    if (parsedRes.registered) {
      toast.dark("Successfully created account.");
      setRegisterStatus(true);
    } else {
      toast.error("That email is taken. Please use a different email address.");
    }
  };

  if (!registerStatus) {
    return (
      <main className="form-signin text-center">
        <Link to="/">
          <img src={LogoImage} alt="OpTask Logo" width="200" height="200" />
          <div className="row justify-content-center mb-4">
            <div>About OpTask</div>
          </div>
        </Link>
        <h1 className="h3 mb-3 fw-normal">Sign up for OpTask!</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="name"
              className="form-control"
              placeholder="Full Name"
              name="userFullName"
              id="userFullName"
              value={nameValue}
              onChange={handleNameChange}
              required
            />
            <label htmlFor="userFullName">Full Name</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              name="userEmail"
              id="userEmail"
              value={emailValue}
              onChange={handleEmailChange}
              required
            />
            <label htmlFor="userEmail">Email Address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              id="userPassword"
              name="userPassword"
              value={passwordValue}
              onChange={handlePasswordChange}
              required
            />
            <label htmlFor="userPassword">Password</label>
          </div>

          <button type="submit" className="w-100 btn btn-lg submitBtn">
            Sign Up
          </button>

          <Link className="signup-link" to="/login">
            Already have an account? Sign in here!
          </Link>
        </form>
      </main>
    );
  } 
  else {
    return <Redirect to="/login" />;
  }
};

export default Register;
