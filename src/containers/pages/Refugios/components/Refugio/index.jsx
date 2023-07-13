import { useNavigate } from 'react-router-dom';

import { Logo } from '../../../../../components/Icons';

import styles from './styles.module.css';

export const Refugio = (props) => {
    const {
        id,
        name,
        description,
        location,
        icon,
        donate
    } = props;

    const history = useNavigate();

    return (
        <div className={styles['refugio-container']}>
            <div className={styles['container__icon']}>
                <div>
                    <img src={icon} alt="pet shelter icon" />
                </div>
            </div>
            <div className={styles['container__info']}>
                <h2>{name}</h2>
                <h4>Descripción del refugio:</h4>
                <p>{description}</p>
                <h4>Ubicación:</h4>
                <p>{location}</p>
            </div>
            <div className={styles['container__info-btn']}>
                <button onClick={() => { history(`/refugios/informacion/${id}`) }}>
                    Más información
                </button>
                <button onClick={() => {window.open(donate, '_blank');}}>
                    <span className={styles['donate-img']}><i className="fa-solid fa-paw"></i></span>
                    Donar
                </button>
            </div>
        </div>
    );
};