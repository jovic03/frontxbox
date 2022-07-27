import api from './api';
import swal from 'sweetalert';

const findAllService = {
  allGenero: () => 
    api.get('/genero')
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => console.log(error))
}

const createService = {
  createGenero: (values: object) =>
  api.post('/genero/create', values)
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

const findByIdService = {
  findGeneroById: (id: string) =>
    api.get(`/genero/${id}`)
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

const updateService = {
  updateGenero: (genero: object, id: string) =>
  api.patch(`/genero/update/${id}`, genero)
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
  deleteGenero: (id: string) =>
  api.delete(`/genero/delete/${id}`)
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

export { findAllService,createService, findByIdService,updateService,deleteService }