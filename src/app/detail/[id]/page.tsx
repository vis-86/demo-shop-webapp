import { ProductDetail } from "@/components/ProductDetail";
import { asyncProductDetail } from "@/fetcher/products/server";

export default async function Detail({ params }: { params: { id: string } }) {
    const { data } = await asyncProductDetail({id: params.id})
    return <div className="">
        <ProductDetail product={data} />
    </div>
}