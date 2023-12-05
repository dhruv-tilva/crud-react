import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CreatePost from "./pages/create-post";
import Edit from "./pages/edit";
import Profile from "./pages/profile";
import { ProtectOther, ProtectedRoutes } from "./component/guarded-route";

let isToken = false;
if (sessionStorage.getItem("token")) {
  isToken = true;
} else {
  isToken = false;
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<ProtectedRoutes comp={<Login />} />} />
        <Route path="/signup" element={<ProtectedRoutes comp={<Signup />} />} />
        <Route
          path="/create-post"
          element={<ProtectOther comp={<CreatePost />} />}
        />
        <Route
          path="/edit/:editId"
          element={<ProtectOther comp={<Edit />} />}
        />
        <Route
          path="/profile/:id"
          element={<ProtectOther comp={<Profile />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
