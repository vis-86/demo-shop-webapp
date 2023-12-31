import { ProductInCart } from "@/fetcher/interfaces"
import Image from "next/image"
import { PropsWithChildren } from "react"
import CloseIcon from "../icons/close"

type Props = {
    product: ProductInCart,
    onRemoveClick: () => void
}

const OrderItem = ({ product, onRemoveClick }: PropsWithChildren<Props>) => {
    if (!product.option) {
        return <>Some problem, sorry</>
    }
    return (
        <div className="order-item-card">
            <div className="order-item-image">
                {product.imgThumbUrl && <Image
                    src={`/api/media/${encodeURI(product.imgThumbUrl)}`}
                    alt={product.name}
                    width={60}
                    height={60}
                    style={{ objectFit: 'cover', maxWidth: '100%', minWidth: '100%', borderRadius: 16 }}
                />}
            </div>
            <div className="order-item-description">
                <div className="order-item-description-top">
                    <div className="order-item-name">{product.name}</div>
                    <div className="order-item-price">{product.option.price * product.count} ₽</div>
                </div>
                <div className="order-item-description-bottom">
                    <div className="order-item-value">{product.option.volume} {product.metric}</div>
                    <div className="order-item-count">{product.count} x {product.option.price} ₽</div>
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