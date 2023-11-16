import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Pages/Sheard/Loading/Loading";
import UseAuth from "../hooks/UseAuth";

const PrivetRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivetRoute;
