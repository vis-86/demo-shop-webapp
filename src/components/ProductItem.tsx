'use clinet'

import { Product } from "@/types/Product"
import Image from "next/image"
import Link from "next/link"

import { PropsWithChildren } from "react"
import { ProductDetail } from "./ProductDetail"

type IProps = {
    item: Product
}

const ProductItem = (props: PropsWithChildren<IProps>) => {
    const {
        id,
        name,
        imgThumbUrl
    } = props.item

    return <div className="product-item">
        <Link href={'/detail/' + id} className="product-item-card">
            <div className="product-item-img">
                <Image src={imgThumbUrl} alt={name} width={80} height={80} priority={false}></Image>
            </div>
            <div className="product-item-footer">
                <div className="product-item-text">{name}</div>
                <div className="product-item-price-info">
                    <div className="product-item-price">от 60 ₽</div>
                    <div className="product-item-volume">90 мл</div>
                </div>
            </div>
        </Link>
    </div>
}
export { ProductItem }