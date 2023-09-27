import { Product } from "@/fetcher/interfaces"
import Image from "next/image"
import Link from "next/link"

import { PropsWithChildren } from "react"

type IProps = {
    item: Product,
    cartCount?: number
}

const ProductItem = ({ item, cartCount }: PropsWithChildren<IProps>) => {
    const {
        id,
        name,
        imgPath,
        priceFrom,
        metric,
        bgColor
    } = item

    return <div className="product-item">
        <Link href={'/detail/' + id} className="product-item-card" style={{backgroundColor: bgColor || '#000'}}>
            {cartCount && <div className="product-item-cart-count">
                {cartCount}
            </div>}
            <div className="product-item-img">
                <Image
                    src={`/api/media/${encodeURI(imgPath)}`}
                    alt={name}
                    width={180}
                    height={115}
                    style={{ objectFit: 'cover', maxWidth: '100%', minWidth: '100%', borderRadius: 16 }}
                />
            </div>
            <div className="product-item-footer">
                <div className="product-item-text"><span>{name}</span></div>
                <div className="product-item-line"></div>
                <div className="product-item-price-info">
                    <div className="product-item-price">от {priceFrom?.price} ₽</div>
                    <div className="product-item-volume">{priceFrom?.volume} {metric}</div>
                </div>
            </div>
        </Link>
    </div>
}
export { ProductItem }