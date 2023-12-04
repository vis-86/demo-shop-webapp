import { DisplayName } from "@/fetcher/interfaces"

interface Props {
  cyrrentId?: number
  deliveryTypes?: DisplayName[]
  onClick: (deliveryType: DisplayName) => void
}

const DeliveryType = ({ deliveryTypes, onClick }: Props) => {
  if (!deliveryTypes) {
    return null
  }

  return (
    <div>
      <h2>Чтобы Вы могли видеть актуальный список продуктов, нам нужно знать как вам удобно получить товар</h2>
      <h3 className="mt-2">Пожалуйста, выберете способ доставки:</h3>
      {deliveryTypes.map(s => {
        return (
          <div key={s.id} onClick={() => onClick(s)} className="delivery-type-item mt-1">
            <div className="delivery-type-name">{s.name}</div>
            <div className="delivery-type-description">{s.description}</div>
          </div>
        )
      })}
    </div>
  )
}

export default DeliveryType