import { Menu, MenuOpen } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import {
  Menu01Icon,
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
} from "hugeicons-react";
export default function MenuSlot({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  return (
    <IconButton size="large" onClick={() => setOpen(!open)}>
      <Menu01Icon />
    </IconButton>
  );
}
