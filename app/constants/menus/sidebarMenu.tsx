// import TransactionsIcon from '@mui/icons-material/CurrencyExchangeRounded';
import {
  Analytics01Icon,
  DashboardSquare01Icon,
  Dollar01Icon,
  HelpCircleIcon,
  InformationCircleIcon,
  Message02Icon,
  Settings01Icon,
  ShoppingBag02Icon,
  TransactionIcon,
  UserMultiple02Icon,
} from "hugeicons-react";
import { Routes } from "../types";

export const primarySideBarMenu: Routes = [
  {
    title: "Dashboard",
    path: "/",
    icon: <DashboardSquare01Icon />,
  },
  {
    title: "Statistics",
    path: "/statistics",
    icon: <Analytics01Icon />,
  },
  {
    title: "Payment",
    path: "/payment",
    icon: <Dollar01Icon />,
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: <TransactionIcon />,
  },
  {
    title: "Products",
    path: "/products",
    icon: <ShoppingBag02Icon />,
  },
  {
    title: "Customer",
    path: "/customer",
    icon: <UserMultiple02Icon />,
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <Message02Icon />,
  },
];

export const SecondarySideBarMenu: Routes = [
  {
    title: "Settings",
    path: "/settings",
    icon: <Settings01Icon />,
  },
  {
    title: "About",
    path: "/about",
    icon: <InformationCircleIcon />,
  },
  {
    title: "Help",
    path: "/help",
    icon: <HelpCircleIcon />,
    elink: "/",
  },
];
