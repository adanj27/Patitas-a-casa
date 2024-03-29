import styles from './styles.module.css';
import shareIcon from '/icons/share-icon.png';
import whatsApp from '/icons/whatsAppSubdata.png';
import facebook from '/icons/facebook-icon.png';

//Animate On Scroll
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useRef, useState } from "react";

export const AdoptarTarjeta = ({
	idNumber,
	img,
	nombre,
	descripcion,
	edad,
	refugio,
	contacto,
}) => {

	const animations = ["fade-left", "fade-right"];
	let animation = 'fade';
	//apply fade only if device is showing only one card on screen
	if (window.innerWidth > 1141) {
		animation = idNumber % 2 === 0 ? animations[1] : animations[0]
	}
	AOS.init({
		offset: 200,
		duration: 600,
		easing: 'ease-in-sine',
		delay: 50,
		once: true,
	});

	const [hovered, setHovered] = useState(false);
	const padreRef = useRef(null);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

	useEffect(() => {
    const padreElement = padreRef.current;

    padreElement.addEventListener('mouseenter', handleMouseEnter);
    padreElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      padreElement.removeEventListener('mouseenter', handleMouseEnter);
      padreElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

	return (
		<div className={`${styles.adoptarTarjeta} ${hovered ? styles["adoptarTarjeta--hovered"] : ""}`} data-aos={animation}>
			<div ref={padreRef} className={styles["adoptarTarjeta__img-container"]}>
				<div className={styles["adoptarTarjeta__imgs"]}>
					<img src={img} alt={`${img}-img`} />
					<img src={img} alt={`${img}-img`} />
				</div>
				<div className={styles.adoptarTarjeta__img}>
					<img src={img} alt={`${img}-img`} />
				</div>
			</div>
			<div className={styles.adoptarTarjeta__description}>
				<h3>{nombre}</h3>
				<p>{descripcion}</p>
				<p>
					<p>Edad: <span>{edad}</span></p>
				</p>
				<p>
					<p>Refugio: <span>{refugio}</span></p>
				</p>
				<p>
					<p>Contacto: <span>+{contacto}</span></p>
				</p>
				<div className={styles.adoptarTarjeta___img__info_container}>
					<img
						className={styles.adoptarTarjeta__img_info}
						src={whatsApp}
						alt="share-icon"
					/>
					<img
						className={styles.adoptarTarjeta__img_info}
						src={facebook}
						alt="share-icon"
					/>
					<img
						className={styles.adoptarTarjeta__img_info}
						src={shareIcon}
						alt="share-icon"
					/>
				</div>
			</div>
		</div>
	);
};

