import React, { useState, useEffect } from "react";
import Button from "../component/button";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
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
import {
  getDatabase,
  ref,
  onValue,
  child,
  get,
  update,
} from "firebase/database";

const Edit = () => {
  const homeClass = "fa-solid fa-house profile-icon";
  const logoutClass = "fa-solid fa-right-from-bracket profile-icon";
  const user = JSON.parse(sessionStorage.getItem("user"));
  // console.log(user.user);
  const location = useLocation();
  const key = location.pathname.split("/")[2];
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const postCol = collection(db, "post");
    const postSnapshot = await getDocs(postCol);
    // debugger
    const newPostData = postSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const filteredPost = newPostData.filter((post) => post.id === key);
    setTitle(filteredPost[0].title);
    setDesc(filteredPost[0].desc);
    console.log(filteredPost);
  };
  const editData = async (e) => {
    e.preventDefault();
    try {
      if (title && desc) {
        const postData = doc(collection(db, "post"), key);
        const update = updateDoc(postData, {
          title: title,
          desc: desc,
        });
        navigate(`/profile/${user.user.uid}`, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
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
              fontWeight: "bolder",
            }}
          >
            {user.user.displayName}
          </span>
        </h4>
        <div className="buttons">
          <Button
            btnText="Home"
            classes={homeClass}
            onClick={() => navigate("/", { replace: true })}
          />
          <Button btnText="Logout" classes={logoutClass} />
        </div>
      </header>
      <form>
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
            style={{ height: "100px" }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <Button btnText="Update" onClick={editData} />
      </form>
    </>
  );
};

export default Edit;
