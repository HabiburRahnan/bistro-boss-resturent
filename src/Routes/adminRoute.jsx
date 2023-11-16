import UseAuth from "../hooks/UseAuth";
import useAdmin from "../hooks/useAdmin";

const adminRoute = () => {
  const { user, isLoading } = UseAuth();
  const [isAdmin, isLoadingAdmin] = useAdmin();
  return <div></div>;
};

export default adminRoute;
