import React from "react";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";
import Cards from "../component/cards";
import { useState, useEffect } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();
  const createPostClass = "fa-solid fa-plus profile-icon";
  const logoutClass = "fa-solid fa-right-from-bracket profile-icon";
  const homeClass = "fa-solid fa-house profile-icon";
  const [isLoader, setIsLoader] = useState(false);
  const [postData, setPostData] = useState([]);
  const [btnText, setBtnText] = useState("Logout");
  const [isDisable, setIsDisabled] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoader(true);
    const postCol = collection(db, "post");
    const postSnapshot = await getDocs(postCol);
    // debugger
    const newPostData = postSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const filteredPost = newPostData.filter(
      (post) => post.email === user.user.email
    );

    setPostData(filteredPost);
    setIsLoader(false);
    console.log("user", user.user);
  };

  const logOut = async () => {
    setIsDisabled(true);
    await signOut(auth);
    navigate("/", { replace: true });
    setLogin(false);
    sessionStorage.clear();
    setIsDisabled(false);
    window.onload();
  };

  const deletePost = async (id) => {
    const post = doc(collection(db, "post"), id);
    deleteDoc(post);
    const filterPost = postData.filter((pst) => pst.id !== id);
    setPostData(filterPost);
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
          <Button
            btnText="Create Post"
            classes={createPostClass}
            onClick={() => navigate("/create-post", { replace: true })}
          />
          <Button
            btnText="Logout"
            classes={logoutClass}
            onClick={logOut}
            isDisable={isDisable}
          />
        </div>
      </header>
      {isLoader && <div className="loader"></div>}
      <Cards postData={postData} isLoader={isLoader} deletePost={deletePost} />
    </>
  );
};

export default Profile;
