import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Loading from "../Loading/Loading";

const Secret = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
     
      <h1>This is Secret</h1>
    </div>
  );
};

export default Secret;
