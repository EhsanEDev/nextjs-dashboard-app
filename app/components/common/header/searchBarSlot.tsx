import { IconButton, InputBase, Stack } from "@mui/material";
import { Search01Icon } from "hugeicons-react";

export default function SearchBarSlot() {
  return (
    <Stack sx={{display: {xs: "none", sm: "flex"}}} gap={0.5} alignItems={"center"} direction={"row"}>
      <IconButton size="medium">
        <Search01Icon size={20} />
      </IconButton>
      <InputBase placeholder="search" />
    </Stack>
  );
}
