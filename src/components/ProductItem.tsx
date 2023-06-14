'use client'

import { Product } from "@/services/types/Product.type"
import Image from "next/image"

import { PropsWithChildren } from "react"

type IProps = {
    item: Product
}

const ProductItem = (props: PropsWithChildren<IProps>) => {
    const {
        name,
        imgThumbUrl
    } = props.item
    return <div className="product-item">
        <div className="product-item-card">
            <div className="product-item-img">
                <Image src={imgThumbUrl} alt={name} width={40} height={60} ></Image>
            </div>
            <div className="product-item-text">{name}</div>
        </div>
    </div>
}
export { ProductItem }