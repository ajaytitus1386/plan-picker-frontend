import "../styles/globals.css";
import "../styles/index.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "@material-tailwind/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LayoutWrapper from "../components/LayoutWrapper";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const STRIPE_PUBLIC_KEY =
  "pk_test_51Lf9AmSIV5sOInTHN9lm0NCpAYcnNQI6IsgFKicKu9Hz7S4cVU7iRjGSak6qenqB7bXayFZ9X5dlFFgLZdfm36Lw00DVq7VUam";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Elements stripe={stripePromise}>
          <LayoutWrapper>
            <Component {...pageProps} />
            <ToastContainer />
          </LayoutWrapper>
        </Elements>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
