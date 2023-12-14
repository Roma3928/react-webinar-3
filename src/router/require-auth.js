import { useAuth } from "../hooks/use-auth";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const RequireAuth = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.element,
};

export default RequireAuth;
