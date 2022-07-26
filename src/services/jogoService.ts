import api from './api';
import swal from 'sweetalert';

const findAllService = {
  allJogo: () => 
    api.get('/jogo')
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => console.log(error))
}

const createService = {
  createJogo: (values: object) =>
  api.post('/jogo/create', values)
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

export { findAllService,createService }