import { ProductDetail } from "@/components/ProductDetail";

export default function Detail({ params }: { params: { id: number } }) {
    return <div className="">
        <ProductDetail id={params.id} />
    </div>
}