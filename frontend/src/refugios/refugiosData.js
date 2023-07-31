//casita de lula
//icono
import casitaDeLulaIcon from '/icons/casitaDeLulaRefugiocono.png';
//principal
import casitaDeLulaPrincipal1 from '/icons/casitaDeLulaMain1.png';
import casitaDeLulaPrincipal2 from '/icons/casitaDeLulaMain2.png';
import casitaDeLulaPrincipal3 from '/icons/casitaDeLulaMain3.png';
//mascotas
import casitaDeLulaPet1 from '/icons/casitaDeLulaPet1.jpg';
import casitaDeLulaPet2 from '/icons/casitaDeLulaPet2.jpg';
import casitaDeLulaPet3 from '/icons/casitaDeLulaPet3.jpg';
import casitaDeLulaPet4 from '/icons/casitaDeLulaPet4.jpg';

export const refugios = [
    {
        id: 0,
        icono: casitaDeLulaIcon,
        nombre: "La Casita de Lula",
        descripcion: "Nuestra misión principal sigue siendo encontrar hogares amorosos y permanentes para cada uno de nuestros perros rescatados. Trabajamos incansablemente para asegurarnos de que reciban el amor y cuidado que se merecen.",
        ubicacion: "Mendoza, Argentina",
        socialMedia: [
            //red social userName, url social, fontAwesome class icon
            // ['@casitadelularefugio','https://www.instagram.com/casitadelularefugio/', 'fa-brands fa-instagram'],
            // ['@lacasitadelularefugio','https://www.facebook.com/lacasitadelularefugio/','fa-brands fa-facebook'],
            // ['leticiacristal821','https://www.youtube.com/@leticiacristal821/videos','fa-brands fa-youtube'],
            // ['lacasitadelularefugio@gmail.com','mailto:lacasitadelularefugio@gmail.com', 'fa-regular fa-envelope'],
            ['+54 261-535-0925','https://wa.link/pd8j00', 'fa-solid fa-phone'],
            ['+54 261-535-0925','https://wa.link/8ki2yh', 'fa-solid fa-phone'],
        ],
        donar: {
            elementos: [],
            links: [
                "https://www.paypal.com/donate/?hosted_button_id=T32XYHV66QS8A",
            ],
        },
        historia: `Nuestro refugio comenzó con una modesta casita destinada exclusivamente a perros rescatados en tránsito. Nos enfocamos en proporcionarles un entorno seguro y 
        amoroso mientras esperaban encontrar un hogar permanente.
        Con el tiempo, ganamos reputación y apoyo comunitario, y las historias de nuestros perros rescatados inspiraron a más personas a unirse a nuestra causa.
        Para satisfacer las necesidades crecientes, construimos un nuevo refugio gracias a la generosidad de donantes y voluntarios comprometidos. Ahora brindamos un espacio más amplio y cómodo para nuestros peludos.`,
        acerca: `El refugio abarca un terreno amplio y cuenta con instalaciones modernas y cómodas para albergar a los animales.
        Se esfuerza por ser un lugar acogedor y seguro donde los animales sin hogar, maltratados o abandonados puedan recibir cuidado y encontrar un hogar amoroso.
        Nuestra misión principal sigue siendo encontrar hogares amorosos y permanentes para cada uno de nuestros perros rescatados. Trabajamos incansablemente para asegurarnos de que reciban el amor y cuidado que se merecen.
        Únete a nosotros en esta noble tarea de marcar la diferencia en la vida de los animales indefensos. Juntos, podemos crear un mundo donde ningún perro sea abandonado o maltratado.`,
        pictures: {
            principal: [
                casitaDeLulaPrincipal1,
                casitaDeLulaPrincipal2,
                casitaDeLulaPrincipal3
            ],
            mascotas: [
                casitaDeLulaPet1,
                casitaDeLulaPet2,
                casitaDeLulaPet3,
                casitaDeLulaPet4
            ],
        },
        section1: true,
        section2: true,
        section3: false,
        section4: true,
        section5: true,
        section6: true,
    },
];