// CUSTOM-HOOK TEMPORAL !!!

//Custom hook que trae los datos de las mascotas. Reemplazar luego con la API implementada con axios
const useDataHoPet = () => {
  const response = require('../Data_HO-PET')
  return response.Data
}

export default useDataHoPet