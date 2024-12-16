"use client";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function DynamicBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // split path segments and remove empty or falsy values
    const pathSegments = pathname.split("/").filter((segment) => segment);
    return pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLastSegment = index === pathSegments.length - 1;
      const capitalizedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);

      return isLastSegment ? (
        <Typography key={href} color="textPrimary">
          {capitalizedSegment}
        </Typography>
      ) : (
        <Link key={href} href={href} underline="hover" color="textDisabled">
          {capitalizedSegment}
        </Link>
      );
    });
  }, [pathname]);

  return (
    <Breadcrumbs sx={{ mt: 3, ml: 3 }}>
      <Link href="/" underline="hover" color="textDisabled">
        Dashboard
      </Link>
      {breadcrumbs}
    </Breadcrumbs>
  );
}
