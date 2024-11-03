import LinkedInProvider from "next-auth/providers/linkedin";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
// import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Account",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          value: "admin",
          placeholder: "enter your usename",
        },
        password: {
          label: "Password",
          type: "password",
          value: "123456",
          placeholder: "enter your password",
        },
      },
      async authorize(credentials, req) {
        const user = { id: "1", username: "admin", password: "123456",name: "Ethan Ekhtiyar", email: "ethan.ekhtiyar@gmail.com" };

        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID as string,
    //   clientSecret: process.env.GOOGLE_SECRET as string,
    // }),
    // LinkedInProvider({
    //   clientId: process.env.LINKEDIN_ID as string,
    //   clientSecret: process.env.LINKEDIN_SECRET as string,
    //   style: { logo: "/linkedin.svg", bg: "#f2f2f2", text: "#000" },
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      style: {
        logo: "/github.svg",
        bg: "#f2f2f2",
        text: "#000",
      },
    }),
  ],
};
