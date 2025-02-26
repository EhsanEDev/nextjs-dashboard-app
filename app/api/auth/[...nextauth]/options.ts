import { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const options = {
  secret: process.env.NEXTAUTH_SECRET as string,
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      },
    },
  },
  callbacks: {
    async session({ session }: { session: Session;}) {
      console.log("Session Config Applied:", session);
      return session
    },
  },
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
      async authorize(credentials) {
        const user = {
          id: "1",
          username: "admin",
          password: "123456",
          name: "Ethan Ekhtiyar",
          email: "ethan.ekhtiyar@gmail.com",
        };

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
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      style: {
        logo: "/github.svg",
        bg: "#f2f2f2",
        text: "#000",
      },
    }),
  ],
};
