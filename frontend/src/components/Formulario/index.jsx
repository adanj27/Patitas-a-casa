/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from 'react';

import styles from "./styles.module.css"

import dog from '/icons/imagenes recursos/dog-seating.png';
import pet from '/icons/imagenes recursos/pet.png';
import close from '/icons/imagenes recursos/close.png';


// hooks
import usePost from '../../hooks/services/usePost';
import axios from 'axios';
/**
 Petype = es un booleano que indica si el formulario es para reportar una mascota
 perdida o si es para reportar una mascota encontrada
 */

export const Formulario = ({ setModal }) => {
  const [petType, setPetType] = useState(true);
	const [formData, setFormData] = useState({
    name: '',
    color: '',
    size: '',
    city: '',
    address: '',
    contact: '',
    loss_date: '',
    image_url: null,
    description: '',
    type_search: 'LOST',
  });

  console.log(formData)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image_url: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const token = localStorage.getItem('token');
    // console.log(token)

    const formDataToSend = new FormData();
  
    // Loop through existing form data and append each key-value pair
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    console.log('Form data to send:', formDataToSend);
    try {
      const response = await axios.post('http://localhost:4000/api/form/lost', formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Pet data sent successfully', response.data);
    } catch (error) {
      console.error('Error sending pet data', error.response?.data || error.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setModal(false);
	};

	return (
		<div className={styles['report-container']}>
      <div className={styles.formContainer}>
        <form action="POST" onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.headerForm}>
            <div
              style={{ borderRadius: '8px 0 0 0' }}
              className={petType ? styles.petSelected : styles.pet}
              onClick={() => setPetType(true)}
            >
              <img src={dog} alt="dog draw" /> Perdido
            </div>
            <div className={!petType ? styles.petSelected : styles.pet} onClick={() => setPetType(false)}>
              <img src={pet} alt="pet draw" /> Encontrado
            </div>
            <button className={styles.cancelButton} onClick={handleCancel}>
              <img src={close} alt="close-icon" />
            </button>
          </div>

          <div className={styles.mainForm}>
            <div className={styles.buttonFile}>
              <label style={{backgroundColor: 'rgba(222, 52, 29, 0.5)'}}>Foto subida</label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                id="petFile"
                className={styles.buttonFile}
                name="image_url" onChange={handleImageChange}
              />
            </div>

            <section className={styles.form_inputs}>
              {petType ? <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleInputChange} /> : ''}
              <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleInputChange} />
              <div>
                <input type="text" name="size" placeholder="Tamaño" value={formData.size} onChange={handleInputChange} />
                <input type="text" name="city" placeholder="Ciudad" value={formData.city} onChange={handleInputChange} />
              </div>
              <input type="text" name="address" placeholder="Dirección" value={formData.address} onChange={handleInputChange} />
              <div>
                <input type="tel" name="contact" placeholder="Contacto" value={formData.contact} onChange={handleInputChange} />
                <input type="date" name="lost_date" placeholder="Fecha" value={formData.lost_date} onChange={handleInputChange} />
              </div>
            </section>

            <h3>Descripción</h3>
            <textarea name="description" cols="30" rows="10" value={formData.description} onChange={handleInputChange}></textarea>

            <button
              onClick={handleSubmit}
              className={styles.submitButon}
              // disabled={loading} // Disable the button while the form is submitting
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
	);
};