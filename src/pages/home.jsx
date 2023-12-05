import React, { useState, useEffect } from "react";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";
import Cards from "../component/cards";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [postData, setPostData] = useState([]);
  const [btnText, setBtnText] = useState("Logout");
  const [isDisable, setIsDisabled] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  // let postData = [];
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
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
    setPostData(newPostData);
    setIsLoader(false);
    // console.log(auth.currentUser.uid);
  };

  const profileClass = "fa-solid fa-user profile-icon";
  const createPostClass = "fa-solid fa-plus profile-icon";
  const logoutClass = "fa-solid fa-right-from-bracket profile-icon";
  const signupClass = "fa-solid fa-user-plus profile-icon";
  const loginClass = "fa-solid fa-right-to-bracket profile-icon";

  const logOut = async () => {
    setIsDisabled(true);
    await signOut(auth);
    navigate("/", { replace: true });
    setLogin(false);
    sessionStorage.clear();
    setIsDisabled(false);
    window.location.reload();
  };
  return (
    <>
      <header className="header">
        <h4 style={{ display: "inline-block" }}>
          Welcome{" "}
          {isLogin && (
            <span
              style={{
                display: "inline-block",
                color: "#3d0a91",
                fontWeight: "bolder",
              }}
            >
              {user.user.displayName}
            </span>
          )}
        </h4>

        {isLogin ? (
          <div className="buttons">
            <Button
              btnText="Profile"
              classes={profileClass}
              onClick={() =>
                navigate(`/profile/${auth.currentUser.uid}`, { replace: true })
              }
            />
            <Button
              btnText="Create Post"
              classes={createPostClass}
              onClick={() => navigate("create-post", { replace: true })}
            />
            <Button
              btnText={btnText}
              classes={logoutClass}
              isDisable={isDisable}
              onClick={logOut}
            />
          </div>
        ) : (
          <div className="buttons">
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup", { replace: true });
              }}
              btnText="Signup"
              classes={signupClass}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate("/login", { replace: true });
              }}
              btnText="Login"
              classes={loginClass}
            />
          </div>
        )}
      </header>

      {isLoader && <div className="loader"></div>}

      <Cards postData={postData} isLoader={isLoader} />
    </>
  );
};

export default Home;
