'use clinet'

import { Product } from "@/types/Product"
import Image from "next/image"
import Link from "next/link"

import { PropsWithChildren } from "react"
import { ProductDetail } from "./ProductDetail"

type IProps = {
    item: Product,
    cartCount?: number
}

const ProductItem = ({ item, cartCount }: PropsWithChildren<IProps>) => {
    const {
        id,
        name,
        imgThumbUrl,
        volumes
    } = item

    const firstVolume = volumes[0]

    return <div className="product-item">
        <Link href={'/detail/' + id} className="product-item-card">
            {cartCount && <div className="product-item-cart-count">
                {cartCount}
            </div>}
            <div className="product-item-img">
                <Image src={imgThumbUrl} alt={name} width={80} height={80} priority={false}></Image>
            </div>
            <div className="product-item-footer">
                <div className="product-item-text">{name}</div>
                <div className="product-item-line"></div>
                <div className="product-item-price-info">
                    <div className="product-item-price">от {firstVolume.price} ₽</div>
                    <div className="product-item-volume">{firstVolume.volume} мл</div>
                </div>
            </div>
        </Link>
    </div>
}
export { ProductItem }