'use client'

import { Product } from "@/types/Product"
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
                <Image src={imgThumbUrl} alt={name} width={80} height={80} ></Image>
            </div>
            <div className="product-item-text">{name}</div>
        </div>
    </div>
}
export { ProductItem }