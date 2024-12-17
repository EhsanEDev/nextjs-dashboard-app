"use client";

import FilterProducts from "@/app/components/products/filterProducts";
import FilterProductsSkeleton from "@/app/components/products/filterProductsSkeleton";
import PrdCard from "@/app/components/products/prdCard";
import PrdCardSkeleton from "@/app/components/products/prdCardSkeleton";
import { Prd } from "@/app/constants/types";
import useFetchFile from "@/app/hooks/useFetchFile";
import { Grid2 } from "@mui/material";
import { useState } from "react";

export default function Products() {
  const [filteredList, setFilteredList] = useState<Prd[]>([]);
  const { data, loading } = useFetchFile("productsList.json");

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12 }}>
          {loading || data === null ? (
            <FilterProductsSkeleton />
          ) : (
            <FilterProducts
              productsList={data}
              setFilteredList={setFilteredList}
            />
          )}
        </Grid2>
        {loading || data === null
          ? Array.from({ length: 8 }).map((_, index) => (
              <Grid2 key={index} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
                <PrdCardSkeleton />
              </Grid2>
            ))
          : filteredList.map((prd: Prd) => (
              <Grid2 key={prd.id} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
                <PrdCard data={prd} />
              </Grid2>
            ))}
      </Grid2>
    </>
  );
}
