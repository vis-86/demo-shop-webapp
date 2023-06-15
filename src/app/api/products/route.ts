import { NextResponse } from "next/server";
import { productList } from "./products";

export async function GET(req: Request) {
    return NextResponse.json(productList)

}