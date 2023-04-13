import { Formik, Form } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { object, string, boolean } from "yup";
import { toast } from "react-toastify";
import AuthCard from "../components/Auth/AuthCard";
import { AuthContextType, useAuthContext } from "../context/AuthContext";
import InputWithError from "../components/InputWithError";
import SubmitButton from "../components/SubmitButton";
import RememberMe from "../components/Auth/RememberMe";
import Link from "next/link";

const loginSchema = () =>
  object().shape({
    email: string().email("Enter a valid email").required("Email is required"),
    password: string()
      .min(8, "Please enter at least 8 characters")
      .required("Password is required"),
    rememberMe: boolean(),
  });

const LoginPage: NextPage = () => {
  const { user, login } = useAuthContext() as AuthContextType;
  const { push } = useRouter();

  useEffect(() => {
    if (user) push("/currentPlan");
  }, [push, user]);

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  return (
    <div className="flex justify-center items-center h-full">
      <AuthCard title={"Login to your account"}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            try {
              const res = await login(
                values.email,
                values.password,
                values.rememberMe
              );
              if (res === null || res === undefined) {
                toast.error("Unable to Login with these credentials");
                return null;
              }
              toast.success("Logged In!");
              push("/currentPlan");
            } catch (error) {
              return error;
            }
          }}
          validationSchema={loginSchema()}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-4 w-full">
                <InputWithError
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  required
                />
                <InputWithError
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                />
                {/* <RememberMe name="rememberMe" /> */}
                <SubmitButton label="Login" onClick={() => {}} />
                <div className="text-lucidean flex gap-x-1 items-center justify-center">
                  <div className="text-seasalt">New to This App?</div>
                  <Link href={"/signup"}>Sign Up</Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </AuthCard>
    </div>
  );
};

export default LoginPage;
