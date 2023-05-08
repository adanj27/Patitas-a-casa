import styles from '../../css/Footer/SectionTwo.module.css';
import iconCall from '../../iconos/phone-call.png';
import iconMail from '../../iconos/mail.png';

export default function SectionTwo({ title, enlaces, contact }) {

  const { tlf, emails } = contact || {};

	return (
		<section className={styles.sectionTwo}>
			<h3 className={styles.sectionTwo__h3}>{title}</h3>
			{enlaces ? (
				<ul className={styles.sectionTwo__ul}>
					{enlaces.map((value, index) => {
						return (
							<li className={styles.sectionTwo__li_enlace} key={index}>
								<a
									href={`/${value
										.toLowerCase()
										.split(' ')
										.join('-')
										.normalize('NFD')
										.replace(/[\u0300-\u036f]/g, '')}`}
								>
									{value}
								</a>
							</li>
						);
					})}
				</ul>
			) : (
				''
			)}
			{contact ? (
				<ul className={styles.sectionTwo__ul}>
					{tlf.map((value, index) => {
						return (
							<div className={styles.sectionTwo__li_tlf} key={index}>
								<img
									className={styles.sectionTwo__li_icon}
									src={iconCall}
									alt="icon-call"
								/>
								<li className={styles.sectionTwo__li_contact}>{value}</li>
							</div>
						);
					})}
          {
            emails.map((value, index) => {
              return (
								<div className={styles.sectionTwo__li_emails} key={index}>
									<img
										className={styles.sectionTwo__li_icon}
										src={iconMail}
										alt="icon-mail"
									/>
									<li className={styles.sectionTwo__li_contact}>{value}</li>
								</div>
							);
            })
          }
				</ul>
			) : (
				''
			)}
		</section>
	);
}
