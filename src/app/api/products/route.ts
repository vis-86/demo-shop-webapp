import { NextResponse } from "next/server";

const apiBase = process.env.API_BASE_URL || "http://194.190.152.175/showcase/api";

export async function GET(req: Request) {
    const response = await fetch(`${apiBase}/product/list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({pageNumber: 0, size: 100})
    })
    //const found = productList.filter(s => s.id === parseInt(params.id))
    return NextResponse.json(await response.json())
}