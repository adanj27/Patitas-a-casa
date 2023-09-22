// ImageWithPopup.js
import { useState } from 'react';
import Popup from '../Popup/index';
import styles from './styles.module.css';

const ImageWithPopup = ({ dev }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
    document.body.classList.add('disable-scroll');
  };

  const closePopup = () => {
    setPopupOpen(false);
    document.body.classList.remove('disable-scroll');
  };

  return (
    <div>
      <img
        src={dev.img}
        alt={`foto ${dev.title} desarrollador`}
        className={styles.popupTrigger}
        onClick={openPopup}
      />
      <Popup dev={dev} isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default ImageWithPopup;