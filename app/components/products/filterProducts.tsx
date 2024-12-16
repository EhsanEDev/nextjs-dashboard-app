"use client";

import { Prd } from "@/app/constants/types";
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  Cancel01Icon,
  FilterRemoveIcon,
  GridViewIcon,
  ListViewIcon,
  Search01Icon,
} from "hugeicons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterProducts({
  productsList,
  setFilteredList,
}: {
  productsList: Prd[];
  setFilteredList: (value: Prd[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState("");
  const [sortby, setSortby] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract brand names without duplication
  const brands = Array.from(new Set(productsList.map((prd: Prd) => prd.brand)));

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    const showQuery = searchParams.get("show") || "";
    const sortbyQuery = searchParams.get("sortby") || "";
    const categoryQuery = searchParams.get("category") || "";
    const priceQuery = searchParams.get("price") || "";
    const brandQuery = searchParams.get("brand") || "";
    setSearch(searchQuery);
    setShow(showQuery);
    setSortby(sortbyQuery);
    setCategory(categoryQuery);
    setPrice(priceQuery);
    setBrand(brandQuery);
  }, [searchParams]);

  useEffect(() => {
    // Update URL query parameters
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries({ search, show, sortby, category, price, brand }).filter(
          ([, value]) => value // Only include non-empty values
        )
      )
    );
    router.push(`?${query.toString()}`, undefined);
  }, [search, show, sortby, category, price, brand, router]);

  useEffect(() => {
    // Apply filters
    let filtered = productsList;

    const filterFunctions = {
      search: (prd: Prd) =>
        prd.title.toLowerCase().includes(search.toLowerCase()),
      show: (prd: Prd) =>
        show === "available"
          ? prd.quantity > 0
          : show === "notavailable"
          ? prd.quantity === 0
          : true,
      sortby: (a: Prd, b: Prd): number => {
        switch (sortby) {
          case "featured":
            return a.id - b.id; // Ascending order by id
          case "popular":
            return b.score - a.score; // Descending order by score
          case "ascqty":
            return a.quantity - b.quantity; // Ascending order by quantity
          case "desqty":
            return b.quantity - a.quantity; // Descending order by quantity
          case "ascprice":
            return a.price - b.price; // Ascending order by price
          case "desprice":
            return b.price - a.price; // Descending order by price
          default:
            return 0; // No change in order
        }
      },
      category: (prd: Prd) => category === "" || prd.brand === category,
      price: (prd: Prd) => {
        if (!price) return true;
        const decoded = JSON.parse(decodeURIComponent(price));
        return (
          (!decoded.min || prd.price > decoded.min) &&
          (!decoded.max || prd.price < decoded.max)
        );
      },
      brand: (prd: Prd) =>
        brand === "" || prd.brand.toLowerCase() === brand.toLowerCase(),
    };

    if (search) filtered = filtered.filter(filterFunctions.search);
    if (show) filtered = filtered.filter(filterFunctions.show);
    if (sortby) filtered = filtered.sort(filterFunctions.sortby);
    if (category) filtered = filtered.filter(filterFunctions.category);
    if (price) filtered = filtered.filter(filterFunctions.price);
    if (brand) filtered = filtered.filter(filterFunctions.brand);

    setFilteredList(filtered);
  }, [search, show, sortby, category, price, brand, productsList, setFilteredList]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleClearSearch = () => {
    setSearch("");
  };
  const handleShow = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "all") {
      setShow("");
    } else {
      setShow(e.target.value);
    }
  };
  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.value) {
      case "max50":
        setPrice(`{"max":50}`);
        break;
      case "min50max100":
        setPrice(`{"min":50,"max":100}`);
        break;
      case "min100max250":
        setPrice(`{"min":100,"max":250}`);
        break;
      case "min250max500":
        setPrice(`{"min":250,"max":500}`);
        break;
      case "min500":
        setPrice(`{"min":500}`);
        break;
      default:
        setPrice("");
        break;
    }
  };
  const handleBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "all") {
      setBrand("");
    } else {
      setBrand(e.target.value);
    }
  };
  const handleSortby = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortby(e.target.value);
  };

  const handleResetFilters = () => {
    setSearch("");
    setBrand("");
    setCategory("");
    setPrice("");
    setShow("");
    setSortby("");
  };

  const IsResetFiltersEnable: boolean = !(
    search ||
    sortby ||
    show ||
    price ||
    brand ||
    category
  );

  return (
    <Card
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <TextField
        size="small"
        value={search}
        onChange={handleSearch}
        sx={{ flexGrow: 1 }}
        label="Search"
        variant="filled"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search01Icon size={16} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                sx={{ visibility: search ? "visible" : "hidden" }}
                position="end"
              >
                <IconButton onClick={handleClearSearch}>
                  <Cancel01Icon size={16} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        select
        label="Sort by"
        size="small"
        variant="filled"
        defaultValue={"featured"}
        value={sortby === "" ? "featured" : sortby}
        onChange={handleSortby}
        sx={{ minWidth: 120, flexGrow: 1 }}
      >
        <MenuItem value={"featured"}>Featured</MenuItem>
        <MenuItem value={"popular"}>Popular</MenuItem>
        <MenuItem value={"ascprice"}>Price: Low to high</MenuItem>
        <MenuItem value={"desprice"}>Price: High to low</MenuItem>
        <MenuItem value={"ascqty"}>Quantity: Low to high</MenuItem>
        <MenuItem value={"desqty"}>Quantity: High to low</MenuItem>
      </TextField>

      <TextField
        select
        defaultValue={"all"}
        value={show === "" ? "all" : show}
        label="Show"
        size="small"
        variant="filled"
        onChange={handleShow}
        sx={{ minWidth: 120, flexGrow: 1 }}
      >
        <MenuItem value={"all"}>All</MenuItem>
        <MenuItem value={"available"}>Available</MenuItem>
        <MenuItem value={"notavailable"}>Not Available</MenuItem>
      </TextField>

      <TextField
        select
        label="Price"
        size="small"
        variant="filled"
        defaultValue={"all"}
        value={price === "" ? "all" : price}
        onChange={handlePrice}
        sx={{ minWidth: 120, flexGrow: 1 }}
      >
        <MenuItem value={"all"}>All</MenuItem>
        <MenuItem value={"max50"}>Below $50</MenuItem>
        <MenuItem value={"min50max100"}>$50 - $100</MenuItem>
        <MenuItem value={"min100max250"}>$100 - $250</MenuItem>
        <MenuItem value={"min250max500"}>$250 - $500</MenuItem>
        <MenuItem value={"min500"}>Above $500</MenuItem>
      </TextField>

      <TextField
        select
        label="Brand"
        size="small"
        variant="filled"
        defaultValue={"all"}
        value={brand === "" ? "all" : brand}
        onChange={handleBrand}
        sx={{ minWidth: 120, flexGrow: 1 }}
      >
        <MenuItem key={0} value={"all"}>
          All
        </MenuItem>
        {brands.map((brand, index) => (
          <MenuItem key={index + 1} value={brand.toLowerCase()}>
            {brand}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        disabled
        select
        label="Category"
        size="small"
        variant="filled"
        defaultValue={0}
        onChange={handleCategory}
        sx={{ minWidth: 120, flexGrow: 1 }}
      >
        <MenuItem value={0}>All</MenuItem>
      </TextField>

      <Box display={"flex"} alignItems={"center"}>
        {/* <Tooltip title="Reset filters"> */}
        <IconButton
          disabled={IsResetFiltersEnable}
          color="primary"
          onClick={handleResetFilters}
          size="large"
        >
          <FilterRemoveIcon />
        </IconButton>
        {/* </Tooltip> */}
      </Box>

      <ToggleButtonGroup disabled exclusive size="small" value="grid">
        <ToggleButton color="info" value="list" sx={{ px: 2 }}>
          <ListViewIcon size={18} />
        </ToggleButton>
        <ToggleButton color="info" value="grid" sx={{ px: 2 }}>
          <GridViewIcon size={18} />
        </ToggleButton>
      </ToggleButtonGroup>
    </Card>
  );
}
