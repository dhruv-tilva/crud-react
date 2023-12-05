import React, { useState, useEffect } from "react";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { getDatabase, ref, onValue, child, get } from "firebase/database";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isDisable, setIsDisabled] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    console.log(user.user.displayName);
  }, []);

  const sendData = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      if (title && desc) {
        const data = {
          title: title,
          desc: desc,
          name: user.user.displayName,
          email: user.user.email,
        };

        const postCol = await collection(db, "post");
        const res = await setDoc(doc(postCol), data);
        setIsDisabled(false);
        navigate("/", { replace: true });
      }
    } catch (error) {}
  };
  return (
    <>
      <header className="header">
        <h4 style={{ display: "inline-block" }}>
          Welcome{" "}
          <span
            style={{
              display: "inline-block",
              color: "#3d0a91",
              fontWweight: "bolder",
            }}
          ></span>
        </h4>
        <div className="buttons">
          <Button
            btnText="Cancel"
            onClick={() => navigate("/", { replace: true })}
          />
        </div>
      </header>
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUser"
            aria-describedby="emailHelp"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            placeholder="Add Description..."
            id="floatingTextarea2"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={{ height: "100px" }}
          ></textarea>
        </div>
        <Button btnText="Create" isDisable={isDisable} />
      </form>
    </>
  );
};

export default CreatePost;
