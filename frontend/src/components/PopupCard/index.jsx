import React, { useEffect, useRef } from 'react';

import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

import styles from './styles.module.css';
import { BgIcons, TopBg } from '../../../public';
import { Logo } from '../Icons';

export const PopupTarjeta = ({ onClose, perdidoData }) => {
  const cardRef = useRef(null);
  console.log(perdidoData);
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);
  const TranslateSize = (size) => {
    switch (size) {
      case 'SMALL':
        return 'Pequeño';
      case 'MEDIUM':
        return 'Mediano';
      case 'LARGE':
        return 'Grande';
      // Puedes agregar más casos según tus necesidades
      default:
        return size; // Mantén el valor original si no coincide con los casos anteriores
    }
  };

  const saveCardAsImage = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 1, // Increase the scale for higher resolution
      width: 1080, // Adjust width for higher resolution
      height: 1920, // Adjust height for higher resolution
      });

      const imageData = canvas.toDataURL('image/jpg');

      // Guardar la imagen
      const fileName = `${perdidoData.name}.jpg`;
      saveAs(imageData, fileName);

      console.log('Imagen guardada correctamente');
      alert('Imagen guardada correctamente');
    }
  };

  return (
    <div className={styles.popup}>
      <div ref={cardRef} className={styles.popup__content}>
        <span className={styles.popup__close} onClick={onClose}>
          &times;
        </span>
        <div className={styles.box}></div>

        <div className={styles.popup__content__text}>
          <TopBg />
          <BgIcons />
          <div className={styles.popup__text}>
            <div className={styles.popup__text__image}>
              <div className={styles.popup__image}>
                <img src={perdidoData.image_url} alt="" />
              </div>
              <h2 className={styles.popup__text__title}>
                Se perdió {perdidoData.name}
              </h2>
            </div>
            <div className={styles.popup__content__data}>
              <div className={styles.popup__dates}>
                <span className={styles.popup__datos}>
                  Tamaño:{' '}
                  <span className={styles.popup__datos__1}>
                    {TranslateSize(perdidoData.size)}
                  </span>
                </span>
                <span className={styles.popup__datos}>
                  Fecha:{' '}
                  <span className={styles.popup__datos__1}>
                    {perdidoData.loss_date
                      ? perdidoData.loss_date.split('T')[0]
                      : ''}
                  </span>
                </span>
              </div>
              <span className={styles.popup__datos}>
                Zona:{' '}
                <span className={styles.popup__datos__1}>
                  {perdidoData.address}, {perdidoData.city}
                </span>
              </span>
              <span className={styles.popup__datos__contact}>
                Contacto: {perdidoData.contact}
              </span>
              <p className={styles.popup__datos}>
                Descripcion:{' '}
                <span className={styles.popup__datos__1}>
                  {perdidoData.description}
                </span>
              </p>
              <Logo className={styles.popup__logo} />
            </div>
          </div>
        </div>
      </div>
      <button onClick={saveCardAsImage} className={styles.popup__download}>Descargar</button>
    </div>
  );
};
