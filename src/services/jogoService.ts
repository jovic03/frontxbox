import api from './api';

const findAllService = {
  allJogo: () => 
    api.get('/jogo')
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => console.log(error))
}

export { findAllService }