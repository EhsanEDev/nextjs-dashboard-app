import { ReactNode } from "react";

export interface RouteItem {
    title: string;
    path: string;
    icon: ReactNode;
    elink?: string;
}
export type Routes = RouteItem[];

export interface NotifItem {
    id: number,
    type?: string,
    sender?: string,
    message: string,
    time: string,
    read: boolean,
}
export type Notifs = NotifItem[];