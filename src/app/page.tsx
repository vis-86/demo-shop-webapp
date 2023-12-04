import { asyncDeliveryTypes, asyncPaymentMethods } from '@/fetcher/dict/server';
import Welcome from '@/views/welcome/Welcome';

export default async function Home() {
  const deliveryTypes = (await asyncDeliveryTypes()).data
  const paymentTypes = (await asyncPaymentMethods()).data

  return (
    <main>
      <div>
        <Welcome
          deliveryTypes={deliveryTypes || []}
          paymentTypes={paymentTypes || []}
        />
      </div>
    </main>
  )
}
