import api from './api';

const findAllService = {
  allProfiles: () => 
    api.get('/perfil')
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => console.log(error))
}

export { findAllService }