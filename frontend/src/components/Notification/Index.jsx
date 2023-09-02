import { useEffect, useRef } from "react";
import logoPatita from "../../../public/icons/logo-patita.png";
import styles from "./styles.module.css";

export const Notification = ({ setShowModal, message }) => {
  const notificationBodyRef = useRef(null);

  const animationNotification = (state) => {
    if (!notificationBodyRef.current) return;
    if (!state) {
      notificationBodyRef.current.style.opacity = "0";
      notificationBodyRef.current.style.transform = "translateY(20px)";
    } else {
      setTimeout(() => {
        notificationBodyRef.current.style.opacity = "1";
        notificationBodyRef.current.style.transform = "translateY(0px)";
      }, 1);
    }
  };

  const hideModal = () => {
    animationNotification(false);
    setTimeout(() => {
      setShowModal(false);
    }, 501);
  };
  useEffect(() => {
    animationNotification(true);
  }, []);

  return (
    <div onClick={hideModal} className={styles["notification-container"]}>
      <div
        ref={notificationBodyRef}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles["notification-container__body"]}
      >
        <div>
          <button onClick={hideModal}>X</button>
        </div>
        <div>
          <img src={logoPatita} alt="patitas a casa logo" />
        </div>
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};
