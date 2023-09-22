import { NextResponse } from "next/server";

const apiBase = process.env.API_BASE_URL || "http://194.190.152.175/showcase/api";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const response = await fetch(new URL(`${apiBase}/product`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({...params})
    })
    return NextResponse.json(await response.json())

}