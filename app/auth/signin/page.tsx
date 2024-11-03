"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const handleSignout = () => {
    const res = signIn();
  };

  return (
    <div>
      Welcome to signin page
      {/* <button onClick={handleSignout}>signin</button> */}
    </div>
  );
}
