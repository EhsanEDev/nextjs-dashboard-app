"use client";
import { ReactNode } from "react";
import { createContext } from "react";
import { useAccount, Account } from "../hooks/useAccount";
// Define the context
export const AccountContext = createContext<Account | undefined>(undefined);

// Context Provider component
export default function AccountProvider({ children }: { children: ReactNode }) {
  const { account } = useAccount();

  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  );
}
