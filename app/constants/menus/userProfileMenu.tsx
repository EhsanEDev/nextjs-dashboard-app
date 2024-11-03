import {
  Settings01Icon,
  UserIcon
} from "hugeicons-react";
import { Routes } from "../types";

export const UserProfileMenu: Routes = [
  {
    title: "My Profile",
    path: "/",
    icon: <UserIcon />,
  },
  {
    title: "Account Settings",
    path: "/",
    icon: <Settings01Icon />,
  },
];
