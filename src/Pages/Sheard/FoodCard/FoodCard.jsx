import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
// import axios from "axios";

const FoodCard = ({ item }) => {
  const { user } = UseAuth();
  const { _id, name, image, price, recipe } = item;
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    if (user && user?.email) {
      // set Add to cart
      // sent cart item to the database
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      // axios.post("http://localhost:5000/carts", cartItem).then

      axiosSecure.post("/carts", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${name} added to cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          //  refetch cart to update the cart item 
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not login",
        text: "Please Login to Add to the Cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          //  send the user to the login page
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 bg-slate-900 text-white px-4">
        ${price}
      </p>
      <div className="card-body ">
        <h2 className=" text-center text-2xl">{name}</h2>
        <p className="text-center">{recipe}</p>
        <div className="card-actions justify-center">
          <button
            onClick={handleAddToCart}
            className="btn btn-outline bg-slate-100 border-0 border-orange-400 hover:text-orange-400 border-b-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
