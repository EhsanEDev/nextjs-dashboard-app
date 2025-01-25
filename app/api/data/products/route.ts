import { Prd } from "@/app/constants/types";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

// This caching mechanism helps improve the performance of the API by reducing the need to repeatedly read the same data from file system
let cachedData: { data: Prd[]; timestamp: number } | null = null;
// const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

/******************************************************************************
 * Handles GET requests to fetch and filter product data.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise that resolves to a NextResponse object containing the filtered product data or an error message.
 *
 * The function performs the following operations:
 * - Extracts query parameters from the request URL:
 *   - `search`: Filters products by title.
 *   - `sortby`: Sorts products by various criteria (e.g., popular, ascqty, desqty, ascprice, desprice).
 *   - `show`: Filters products by availability (e.g., available, notavailable).
 *   - `price`: Filters products by price range.
 *   - `brand`: Filters products by brand.
 *   - `category`: Filters products by category.
 * - Reads product data from a mockup JSON file.
 * - Applies the extracted filters to the product data.
 * - Returns the filtered product data as a JSON response.
 * - Handles and logs any errors that occur during the process.
 *****************************************************************************/
export async function GET(request: Request) {
  try {
    // Simulate a delay for testing
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const sortby = searchParams.get("sortby");
    const show = searchParams.get("show");
    const price = searchParams.get("price");
    const brand = searchParams.get("brand");
    // const category = searchParams.get("category");

    // Read the file if not cached or cache expired
    if (!cachedData) {
      // Mockup data folder path
      const filePath = path.join(
      process.cwd(),
      "app/placeholders",
      "productsList.json"
      );

      const data = await fs.readFile(filePath, "utf-8");
      cachedData = { data: JSON.parse(data), timestamp: Date.now() };
    }

    // Apply filters
    let filteredData: Prd[] = cachedData?.data || [];

    // Apply Search filter
    if (search) {
      filteredData = filteredData.filter((prd) =>
        prd.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply Sortby filter
    if (sortby) {
      switch (sortby) {
        case "popular":
          filteredData = filteredData.sort((a, b) => b.score - a.score); // Descending order by score
          break;
        case "ascqty":
          filteredData = filteredData.sort((a, b) => a.quantity - b.quantity); // Ascending order by quantity
          break;
        case "desqty":
          filteredData = filteredData.sort((a, b) => b.quantity - a.quantity); // Descending order by quantity
          break;
        case "ascprice":
          filteredData = filteredData.sort((a, b) => a.price - b.price); // Ascending order by price
          break;
        case "desprice":
          filteredData = filteredData.sort((a, b) => b.price - a.price); // Descending order by price
          break;
        default:
          filteredData = filteredData.sort((a, b) => a.id - b.id); // Ascending order by id
          break;
      }
    }

    // Apply Show filter
    if (show) {
      filteredData = filteredData.filter((prd) => {
        switch (show) {
          case "available":
            return prd.quantity > 0;
          case "notavailable":
            return prd.quantity === 0;
          default:
            return true;
        }
      });
    }

    // Apply Price filter
    if (price) {
      filteredData = filteredData.filter((prd) => {
        const { min, max } = JSON.parse(decodeURIComponent(price));
        return (!min || prd.price > min) && (!max || prd.price < max);
      });
    }

    // Apply Brand filter
    if (brand) {
      filteredData = filteredData.filter(
        (prd) => prd.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    // Apply Category filter
    // if (category) {
    //   filteredData = filteredData.filter(
    //     (prd) => category === "" || prd.brand === category
    //   );
    // }

    // Return the filtered JSON data
    return NextResponse.json(filteredData, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching or filtering data:", {
        message: error.message,
        stack: error.stack,
        requestUrl: request.url,
        queryParams: request.url.split('?')[1]
      });
    } else {
      console.error("Unknown error:", error);
    }
    return NextResponse.json(
      { error: `Error fetching or filtering data: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
