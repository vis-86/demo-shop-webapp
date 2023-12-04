import styles from './PreLoader.module.css'

import React from 'react'

const PreLoader = () => {
  return (
    <div className={styles.preloader_container}>
      <span className={styles.loader} />
    </div>
  )
}

export default PreLoader