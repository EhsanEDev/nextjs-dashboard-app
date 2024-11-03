import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  ToggleButton,
  ToggleButtonGroup,
  useColorScheme,
} from "@mui/material";
import { Moon02Icon, SmartPhone01Icon, Sun03Icon } from "hugeicons-react";
import { useRef, useState } from "react";

export default function ThemeModeSlot({
  variant,
}: {
  variant?: "drop" | "group";
}) {
  const { mode, setMode } = useColorScheme();

  // Handle color mode change
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    if (value) {
      setMode(value as "system" | "light" | "dark");
    }
  };

  // Menu open/close logic
  const [open, setOpen] = useState<boolean>(false);
  const anchorEl = useRef<HTMLButtonElement | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {variant === "group" ? (
        <ToggleButtonGroup
          exclusive
          size="small"
          value={mode}
          onChange={handleChange}
        >
          <ToggleButton value="system">
            <SmartPhone01Icon />
          </ToggleButton>
          <ToggleButton value="light">
            <Sun03Icon />
          </ToggleButton>
          <ToggleButton value="dark">
            <Moon02Icon />
          </ToggleButton>
        </ToggleButtonGroup>
      ) : (
        <Box>
          <IconButton size="large" ref={anchorEl} onClick={handleOpen}>
            {mode === "system" ? <SmartPhone01Icon /> : <></>}
            {mode === "light" ? <Sun03Icon /> : <></>}
            {mode === "dark" ? <Moon02Icon /> : <></>}
          </IconButton>
          <Menu
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            anchorEl={anchorEl.current}
            open={open}
            onClose={handleClose}
          >
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setMode("light");
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <Sun03Icon />
                </ListItemIcon>
                <ListItemText>Light</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setMode("dark");
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <Moon02Icon />
                </ListItemIcon>
                <ListItemText>Dark</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setMode("system");
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <SmartPhone01Icon />
                </ListItemIcon>
                <ListItemText>System</ListItemText>
              </ListItemButton>
            </ListItem>
          </Menu>
        </Box>
      )}
    </>
  );
}
