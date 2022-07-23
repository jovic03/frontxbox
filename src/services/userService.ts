import api from './api';

const findAllService = {
  allUser: () => 
    api.get('/usuario')
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => console.log(error))
}

export { findAllService }