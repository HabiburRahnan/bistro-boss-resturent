import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Pages/Sheard/Loading/Loading";
import UseAuth from "../hooks/UseAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const [isAdmin, isLoadingAdmin] = useAdmin();
  const location = useLocation();

  if (loading || isLoadingAdmin) {
    return <Loading></Loading>;
  }
  if (user || isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
