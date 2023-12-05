import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const Signup = () => {
  const loginClass = "fa-solid fa-user-plus profile-icon";
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnText, setBtnText] = useState("Sign Up");
  const [isDisabled, setIsDisabled] = useState(false);
  const poiner = isDisabled ? "cursorNotAllowed btn" : "cursorAllowed btn";

  const signUp = async (e) => {
    try {
      if (name && email && password) {
        e.preventDefault();
        setIsDisabled(true);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const namimg = await updateProfile(auth.currentUser, {
          displayName: name,
        });
        setBtnText("Sign Up");
        setIsDisabled(false);
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        alert("Email Already in Use....");
        setBtnText("Sign Up");
        setIsDisabled(false);
      }
    }
  };

  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUser"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <a
            href=""
            style={{ display: "block" }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/login", { replace: true });
            }}
          >
            Already User?
          </a>
        </div>
        <button onClick={signUp} className={poiner} disabled={isDisabled}>
          {btnText}
        </button>
      </form>
    </>
  );
};

export default Signup;

// const res = await createUserWithEmailAndPassword(auth, this.email, this.password)
//         this.$refs.login.innerText = "Sign Up"
//         const name = await updateProfile(auth.currentUser, {
//           displayName: this.userName
//         })
