import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(request: Request) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const file = searchParams.get("file"); // ?file=products.json
    // const search = searchParams.get("search"); // ?search=abcd
    // const show = searchParams.get("show"); // ?show=all
    // const sortby = searchParams.get("sortby"); // ?sortby=popular
    // const category = searchParams.get("category"); // ?category=all
    // const price = searchParams.get("price"); // ?price=50-100
    // const brand = searchParams.get("brand"); // ?brand=all

    if (!file) {
      return NextResponse.json(
        { error: "File query parameter is required" },
        { status: 400 }
      );
    }

    // Simulate a delay for testing
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // Mockup data folder path
    const filePath = path.join("app/placeholders", file);

    // Read the file
    const data = await fs.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(data);

    // Apply filters
    const filteredData = parsedData;

    // if (search) {
    //   filteredData = filteredData.filter((item: any) =>
    //     item.name.toLowerCase().includes(search.toLowerCase())
    //   );
    // }

    // if (category) {
    //   filteredData = filteredData.filter((item: any) =>
    //     item.category.toLowerCase() === category.toLowerCase()
    //   );
    // }

    // Return the filtered JSON data
    return NextResponse.json(filteredData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching or filtering data" },
      { status: 500 }
    );
  }
}
