import { ProductInCart } from "@/types/Product"
import Image from "next/image"
import { PropsWithChildren } from "react"
import CloseIcon from "../icons/close"

type Props = {
    product: ProductInCart,
    onRemoveClick: () => void
}

const OrderItem = ({ product, onRemoveClick }: PropsWithChildren<Props>) => {
    return (
        <div className="order-item-card">
            <div className="order-item-image">
                <Image src={product.imgThumbUrl} alt={product.name} width={40} height={40} priority={true}></Image>
            </div>
            <div className="order-item-description">
                <div className="order-item-description-top">
                    <div className="order-item-name">{product.name}</div>
                    <div className="order-item-price">{product.volume.price * product.count} ₽</div>
                </div>
                <div className="order-item-description-bottom">
                    <div className="order-item-value">{product.volume.volume} {product.volume.inch}</div>
                    <div className="order-item-count">x {product.count}</div>
                </div>
            </div>
            <div className="order-item-actions">
                <button className='circle-btn circle-btn--sm circle-btn--danger' onClick={onRemoveClick}>
                    <CloseIcon />
                </button>
            </div>
        </div>
    )
}

export default OrderItem