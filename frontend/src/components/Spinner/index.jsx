import styles from './styles.module.css'

const index = () => {
  return (
    <div className={styles.spinner__container}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default index