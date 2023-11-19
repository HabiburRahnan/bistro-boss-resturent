import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../assets/Components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import PaymentFrom from "./PaymentFrom";

// TODO : add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const Payment = () => {
  return (
    <div>
      <SectionTitle
        heading="Payment"
        subHeading="Please Payment you Bill"></SectionTitle>
      <div>
        <Elements stripe={stripePromise}>
          <PaymentFrom></PaymentFrom>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
