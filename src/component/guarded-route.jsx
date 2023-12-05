import { Navigate } from "react-router-dom";
import Login from "../pages/login";
let isToken = false;
if (sessionStorage.getItem("token")) {
  isToken = true;
} else {
  isToken = false;
}
function ProtectedRoutes({ comp }) {
  return !isToken ? comp : <Navigate to="/" />;
}

function ProtectOther({ comp }) {
  return isToken ? comp : <Navigate to="/" />;
}

export { ProtectOther, ProtectedRoutes };
