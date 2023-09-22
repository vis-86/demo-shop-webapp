const apiBase = process.env.API_BASE_URL || "http://194.190.152.175/showcase/api"

export async function GET(req: Request, { params }: { params: { img: string } }) {
    console.log('media GET', `${apiBase}/media/` + params.img)
    const result = await fetch(new URL(`${apiBase}/media/` + params.img))
    return new Response(await result.blob())
}