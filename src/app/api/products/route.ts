import { NextResponse } from "next/server";
import { menuePrices } from "./products";

export async function GET(req: Request) {
    return NextResponse.json(menuePrices)

}