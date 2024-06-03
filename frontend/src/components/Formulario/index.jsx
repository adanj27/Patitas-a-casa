/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

import dog from '/icons/imagenes recursos/dog-seating.png';
import pet from '/icons/imagenes recursos/pet.png';
import close from '/icons/imagenes recursos/close.png';

// hooks
// import usePost from '../../hooks/services/usePost';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Image } from 'cloudinary-react';
/**
 Petype = es un booleano que indica si el formulario es para reportar una mascota
 perdida o si es para reportar una mascota encontrada
 */

export const Formulario = ({ setModal }) => {
  const { token } = useAuth();
  const [petType, setPetType] = useState(true);
  // console.log(petType);
  const [formData, setFormData] = useState({});
  // console.log(formData);
  const [file, setFile] = useState(false);

  useEffect(() => {
    setFormData(
      petType
        ? {
            name: '',
            color: '',
            size: '',
            city: '',
            address: '',
            contact: '',
            loss_date: '',
            description: '',
            type: '',
            type_search: 'LOST',
            image_url: null,
          }
        : {
            color: '',
            size: '',
            city: '',
            address: '',
            contact: '',
            loss_date: '',
            description: '',
            type: '',
            type_search: 'FOUND',
            image_url: null,
          }
    );
  }, [petType]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name !== 'image_url') {
      // Si es la propiedad 'loss_date', formatea la fecha
      const formattedValue =
        name === 'loss_date' ? `${value}T23:39:49.000000Z` : value;
      console.log(formattedValue);

      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file === null) {
      console.log('No se ha seleccionado ninguna imagen');
      return;
    }

    // Subir la imagen a Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'aqeczzrt');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dlfwgaprv/image/upload',
        formData
      );
      const imageUrl = response.data.secure_url;

      setFormData((prevData) => ({
        ...prevData,
        image_url: imageUrl,
      }));
      setFile(true);
    } catch (error) {
      console.error('Error al subir la imagen a Cloudinary:', error);
      console.error('Cloudinary response:', error.response.data);
      setFile(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = petType ? '/form/lost' : '/form/found';
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Asegúrate de enviar el token en el encabezado
        },
      });

      if (response) {
        console.log('Formulario enviado con éxito:', response.data);
        setModal(false);
        // Aquí puedes realizar acciones adicionales después de enviar el formulario con éxito
      } else {
        console.error('Error al enviar el formulario:', response.status);
        // Aquí puedes manejar errores específicos si es necesario
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error.response || error);
      // Aquí puedes manejar errores generales o de red
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setModal(false);
  };

  return (
    <div
      className={styles['report-container']}
      onClick={() => {
        setModal(false);
      }}
    >
      <div
        className={styles.formContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form action="POST" onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.headerForm}>
            <div
              style={{ borderRadius: '8px 0 0 0' }}
              className={petType ? styles.petSelected : styles.pet}
              onClick={() => setPetType(true)}
            >
              <img src={dog} alt="dog draw" /> Perdido
            </div>
            <div
              className={!petType ? styles.petSelected : styles.pet}
              onClick={() => setPetType(false)}
            >
              <img src={pet} alt="pet draw" /> Encontrado
            </div>
            <button className={styles.cancelButton} onClick={handleCancel}>
              <img src={close} alt="close-icon" />
            </button>
          </div>

          <div className={styles.mainForm}>
            <div
              style={
                file
                  ? {
                      display: 'flex',
                      width: '100%',
                      gap: '1rem',
                      alignItems: 'center',
                    }
                  : {}
              }
            >
              {file ? (
                <Image
                  cloudName="dlfwgaprv"
                  publicId={formData.image_url}
                  width="100"
                  height="100"
                  style={{ borderRadius: '1rem' }}
                />
              ) : (
                ''
              )}
              <div className={styles.buttonFile}>
                <label
                  style={
                    file ? { backgroundColor: 'rgba(222, 52, 29, 0.5)' } : {}
                  }
                >
                  {file ? `Foto subida` : `Subir foto`}
                </label>
                {/* // accept=".jpg, .jpeg, .png" // id="petFile" */}
                <input
                  type="file"
                  id="petFile"
                  accept=".jpg, .jpeg, .png"
                  name="image_url"
                  className={styles.buttonFile}
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <section className={styles.form_inputs}>
              {!petType ? (
                ''
              ) : (
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                />
              )}
              <input
                type="text"
                name="color"
                placeholder="Color"
                value={formData.color}
                onChange={handleChange}
              />
              <div>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                >
                  <option value="">Tamaño</option>
                  <option value="SMALL">Pequeño</option>
                  <option value="MEDIUM">Mediano</option>
                  <option value="LARGE">Grande</option>
                </select>
                <input
                  type="text"
                  name="city"
                  placeholder="Departamento"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Dirección"
                value={formData.address}
                onChange={handleChange}
              />
              <div>
                <input
                  type="text"
                  name="contact"
                  placeholder="Contacto"
                  value={formData.contact}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="loss_date"
                  value={
                    formData.loss_date ? formData.loss_date.split('T')[0] : ''
                  }
                  onChange={handleChange}
                />
              </div>
              <div>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Especie</option>
                  <option value="DOG">Perro</option>
                  <option value="CAT">Gato</option>
                </select>
              </div>
            </section>

            <h3>Descripción</h3>
            <textarea
              name="description"
              cols="30"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              maxLength={300}
            />
            <p>Maximo 300 caracteres</p>

            <button
              // onClick={handleSubmit}
              className={styles.submitButon}
              disabled={loading} // Disable the button while the form is submitting
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
