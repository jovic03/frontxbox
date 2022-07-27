import api from './api';
import swal from 'sweetalert';

const findAllService = {
  allProfiles: () => 
    api.get('/perfil')
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => console.log(error))
}

const findProfileById = {
  findProfileById: (id: string) =>
    api.get(`/perfil/${id}`)
    .then((response: any) => response)
    .catch((error: any) => {
      swal({
        title: "Erro!",
        text: `${error.message}`,
        icon: "error",
        timer: 7000,
      })
    })
}

const homepage = {
  homepage: (id: string) =>
    api.get(`/${id}`)
    .then((response: any) => response)
    .catch((error: any) => {
      swal({
        title: "Erro!",
        text: `${error.message}`,
        icon: "error",
        timer: 7000,
      })
    })
}


export { findAllService,findProfileById,homepage }