import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PaymentFrom = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const [cart, refetch] = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [totalPrice, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment Error", error);
      setError(error.message);
    } else {
      console.log("paymentMethod", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: cart.map((item) => item._id),
        menuItemIds: cart.map((item) => item.menuId),
        status: "pending",
      };

      const res = await axiosSecure.post("/payment", payment);

      if (res?.data?.paymentResult?.acknowledged) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Payment!",
          text: "Your Payment has been Successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        navigate("/dashboard/paymentHistory");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}></CardElement>
      <button
        className="btn btn-outline bg-orange-400 my-10 "
        type="submit"
        disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-600 text-lg">{error}</p>
      {transactionId && (
        <p className="text-blue-600 text-lg">
          Your transaction Id: {transactionId}
        </p>
      )}
    </form>
  );
};

export default PaymentFrom;
