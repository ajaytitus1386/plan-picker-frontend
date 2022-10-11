import { NextPage } from "next";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { boolean, object, string } from "yup";
import AuthCard from "../components/Auth/AuthCard";
import { AuthContextType, useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import InputWithError from "../components/InputWithError";
import RememberMe from "../components/Auth/RememberMe";
import SubmitButton from "../components/SubmitButton";
import Link from "next/link";

const signUpSchema = () =>
  object().shape({
    username: string().required("A Username is required"),
    email: string().email("Enter a valid email").required("Email is required"),
    password: string()
      .min(8, "Please enter at least 8 characters")
      .required("Password is required"),
    rememberMe: boolean(),
  });

const SignUpPage: NextPage = () => {
  const { user, signUp } = useAuthContext() as AuthContextType;
  const { push } = useRouter();

  useEffect(() => {
    if (user) push("/currentPlan");
  }, [push, user]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthCard title="Create Account">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            try {
              const res = await signUp(
                values.username,
                values.email,
                values.password,
                values.rememberMe
              );
              if (res === null || res === undefined) {
                toast.error("Unable to Register with these credentials");
                return null;
              }
              toast.success("Successfully Registered!");
              push("/currentPlan");
            } catch (error) {}
          }}
          validationSchema={signUpSchema()}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-4 w-full">
                <InputWithError
                  name="username"
                  placeholder="Name"
                  type="text"
                  required
                />
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
                <RememberMe name="rememberMe" />
                <SubmitButton label="Sign Up" onClick={() => {}} />
                <div className="text-lucidean flex gap-x-1 items-center justify-center">
                  <div className="text-black">Already have an account?</div>
                  <Link href={"/login"}>Log In</Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </AuthCard>
    </div>
  );
};

export default SignUpPage;
