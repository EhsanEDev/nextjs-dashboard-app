import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "@app/logo3.png";
import { colors } from "@mui/material";

export default function Brand() {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        gap: 3.5,
        px: "5px"
      }}
    >
      <Image width={32} height={32} src={Logo} alt="logo" />
      <Typography color="secondary" variant="h5" component="h1">
        Dashboard App
      </Typography>
    </Box>
  );
}
