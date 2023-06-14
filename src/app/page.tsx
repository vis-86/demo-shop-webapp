import styles from './page.module.css'
import { ProductList } from '@/components/ProductList'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <ProductList />
      </div>
    </main>
  )
}
