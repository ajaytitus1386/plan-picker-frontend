import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { AuthContextType, useAuthContext } from "../context/AuthContext";

const Home: NextPage = () => {
  const { user } = useAuthContext() as AuthContextType;
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (router.pathname === "/") {
      if (user) router.push("/currentPlan");
      else router.push("/login");
    }
  }
  return (
    <div>
      <Head>
        <title>Pickle</title>
        <meta name="description" content="Compare and Pick your plan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Loading</h1>
    </div>
  );
};

export default Home;
