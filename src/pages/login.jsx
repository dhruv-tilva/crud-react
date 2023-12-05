import React from "react";
import { Link } from "react-router-dom";
import Button from "../component/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import { successMessage, errorMessage } from "../notification";
  import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnText, setBtnText] = useState("Login");
  const [isDisabled, setIsDisabled] = useState(false);
  const poiner = isDisabled ? "cursorNotAllowed btn" : "cursorAllowed btn";
  const loginClass = "fa-solid fa-right-to-bracket profile-icon";
  const navigate = useNavigate();

  const login = async (e) => {
    
    e.preventDefault();
    try {
      if ((email, password)) {
        setIsDisabled(true);
        const user = await signInWithEmailAndPassword(auth, email, password);
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", user.user.accessToken);
        setEmail("");
        setPassword("");
        navigate("/", { replace: true });
        successMessage("Login Successfully")
        setIsDisabled(false);
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
      if(error.message){
        errorMessage("Invalid Email or Password")
      } else{
        errorMessage("Something went wrong!!");
      }
    }
  };
  const forgotPassword = async (e) => {
    e.preventDefault();
    if (email) {
      const pass = await sendPasswordResetEmail(auth, email);
      if (pass) {
        alert("Link is sent to the Email...");
      }
    }
  };
  const gotToSignUp = (e) => {
    e.preventDefault();
    navigate("/signup", { replace: true });
  };
  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <a href="" style={{ display: "block" }} onClick={forgotPassword}>
            Forgot Password?
          </a>
          <a href="" style={{ display: "block" }} onClick={gotToSignUp}>
            New User?
          </a>
        </div>
        <button onClick={login} className={poiner} disabled={isDisabled}>
          {btnText}
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
