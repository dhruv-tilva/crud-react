import React from "react";
import { useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Cards = ({ postData, isLoader, deletePost }) => {
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  const userId = location.pathname.split("/");
  const user = JSON.parse(sessionStorage.getItem("user"));
  userId.pop();
  //   console.log(userId.join(""));
  const styles =
    userId.join("") === "profile"
      ? {
          width: "25rem",
          height: "10rem",
        }
      : {
          width: "25rem",
          height: "7rem",
        };
  if (postData.length > 0 && !isLoader) {
    return (
      <>
        <div
          id="container"
          className="cards-conatainer d-flex flex-row flex-wrap gap-3 justify-content-center align-items-start animate-bottom"
        >
          {postData.map((post) => {
            return (
              <div
                key={post.id}
                className="card posts medium-box-shadow"
                style={styles}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    <span style={{ color: "#3d0a91", fontWeight: "bold" }}>
                      {post.name}
                    </span>
                    : {post.title}
                  </h5>
                  <p className="card-text">{post.desc}</p>
                  {location.pathname !== `/` && (
                    <div className="d-flex justify-content-between align-items-center">
                      <a
                        href="#"
                        className="btn"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/edit/${post.id}`, { replace: true });
                        }}
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="btn"
                        onClick={(e) => {
                          e.preventDefault();
                          deletePost(post.id);
                        }}
                      >
                        Delete
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else if (postData.length == 0 && !isLoader) {
    return (
      <div className="post-message animate-bottom">
        <h4>No Post Yet...</h4>
      </div>
    );
  }
};

export default Cards;
