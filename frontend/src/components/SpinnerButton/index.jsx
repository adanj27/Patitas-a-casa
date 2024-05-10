import styles from './styles.module.css'

export const SpinnerButton = () => {
  return (
    <div className={styles.spinner__container}>
      <div className={styles.spinner}></div>
    </div>
  )
}
