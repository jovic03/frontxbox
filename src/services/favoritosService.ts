import api from './api';
import swal from 'sweetalert';

const createService = {
    createFavorito: (values: object) =>
    api.post('/favoritos/create', values)
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

const findAllService = {
    allFavoritos: () => 
      api.get('/favoritos')
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => console.log(error))
  }


const findByIdService = {
  findFavoritosById: (id: string) =>
    api.get(`/favoritos/${id}`)
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


const deleteService = {
  deleteFavorito: (id: string) =>
  api.delete(`/favoritos/delete/${id}`)
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

export { findAllService,createService, findByIdService,deleteService }