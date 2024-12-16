import { ReactNode } from "react";

export interface Route {
  title: string;
  path: string | "";
  icon: ReactNode;
  elink?: string;
  eicon?: ReactNode;
}
export interface Element {
  element: ReactNode;
}
export type NavItem = Route | Element;
export type Navs = NavItem[];

export interface NotifItem {
  id: number;
  type?: string;
  sender?: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
}
export type Notifs = NotifItem[];

export type ColorMode = "system" | "light" | "dark";

export interface Prd {
  id: number;
  title: string;
  summary: string;
  quantity: number;
  score: number;
  price: number;
  brand: string;
  image: string;
}
export type Prds = Prd[];

export type cardType = "sales" | "orders" | "profit" | "customers";
