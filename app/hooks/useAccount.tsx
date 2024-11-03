"use client";
import { useEffect, useState } from "react";

// Account interface
export interface Account {
  username: string;
  email: string;
  avatar: string;
}

// Custom hook to fetch account data
export const useAccount = () => {
  const [account, setAccount] = useState<Account | undefined>(undefined);

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        const user = data.results[0];
        // Extracting and setting the data
        const accountInfo: Account = {
          username: user.login.username,
          email: user.email,
          avatar: user.picture.thumbnail,
        };
        setAccount(accountInfo);
      });
  }, []);

  return { account, setAccount };
};
