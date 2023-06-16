import { NextResponse } from "next/server";
import { productList } from "../products";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    console.log("params", params)
    const found = productList.filter(s => s.id === parseInt(params.id))
    return NextResponse.json(found.length === 0 ? null : found[0])

}