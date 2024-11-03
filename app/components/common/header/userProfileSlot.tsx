import { UserProfileMenu } from "@/app/constants/menus/userProfileMenu";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import { Logout04Icon } from "hugeicons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useAccount } from "../../../hooks/useAccount";

export default function UserProfileSlot() {
  const { data: session } = useSession();
  const currentPath = usePathname();
  const { account } = useAccount();
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [isShowSignoutDialog, setIsShowSignoutDialog] =
    useState<boolean>(false);
  const handleOpenMenu = () => {
    setIsShowMenu(true);
  };

  const handleCloseMenu = () => {
    setIsShowMenu(false);
  };
  const anchorEl = useRef<HTMLButtonElement | null>(null);
  return (
    <Box>
      <IconButton size="small" ref={anchorEl} onClick={handleOpenMenu}>
        <Avatar alt={session?.user?.name ?? ""} src={session?.user?.image ?? ""}>
          {session?.user?.name?.charAt(0)}
        </Avatar>
      </IconButton>
      <Menu
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorEl={anchorEl.current}
        open={isShowMenu}
        onClose={handleCloseMenu}
      >
        <ListItem sx={{ gap: 2 }}>
          <ListItemAvatar>
            <Avatar
              sx={{ width: 64, height: 64 }}
              alt={session?.user?.name ?? ""}
              src={session?.user?.image ?? ""}
            >
              {session?.user?.name?.charAt(0)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={session?.user?.name}
            secondary={session?.user?.email}
          />
        </ListItem>
        <Divider />
        {UserProfileMenu.map(({ title, path, icon }, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton
              onClick={() => {
                handleCloseMenu();
              }}
              LinkComponent={Link}
              href={path}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText>{title}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setIsShowSignoutDialog(true);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <Logout04Icon />
            </ListItemIcon>
            <ListItemText>SignOut</ListItemText>
          </ListItemButton>
        </ListItem>
      </Menu>
      <Dialog fullWidth open={isShowSignoutDialog}>
        <DialogTitle>Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              signOut({ redirect: true, callbackUrl: currentPath })
            }
          >
            Sign Out
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsShowSignoutDialog(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
