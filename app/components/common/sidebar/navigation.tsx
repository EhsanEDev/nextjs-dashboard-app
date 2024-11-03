"use client";
import { RouteItem } from "@/app/constants/types";
import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  primarySideBarMenu,
  SecondarySideBarMenu,
} from "../../../constants/menus/sidebarMenu";

export default function Navigation({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  const version = "v1.1.0";
  const chipInfo = open ? `${version} --- Powered by Material UI` : `${version}`;
  const currentPath = usePathname();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Toolbar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: md ? "start" : "space-between",
        }}
      >
        <List>
          {primarySideBarMenu.map(({ title, path, icon }: RouteItem) => (
            <ListItem key={title}>
              <ListItemButton
                selected={currentPath === path ? true : false}
                href={path}
                LinkComponent={Link}
                sx={{ borderRadius: 1 }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ display: { xs: "block", md: "none" } }} />
        <List>
          {SecondarySideBarMenu.map(
            ({ title, path, icon, elink }: RouteItem) => (
              <ListItem key={title}>
                <ListItemButton
                  selected={currentPath === path ? true : false}
                  href={path}
                  LinkComponent={Link}
                  sx={{ borderRadius: 1 }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Chip
          sx={{ textAlign: "center", display: { xs: "none", md: "block" }, mx: "10px", my: "25px" }}
          color="default"
          size="small"
          variant="outlined"
          label={chipInfo}
        />
      </Box>
    </>
  );
}
