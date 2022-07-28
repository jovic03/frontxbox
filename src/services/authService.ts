import api from './api';
import swal from 'sweetalert';

interface userLoginObj {
  email: string;
  password: string;
}

interface userObj {
  name: string;
  email: string;
  password: string;
  passwordConfirmation:string,
  cpf:string
}


const loginService = {
  login: (values: userLoginObj) => 
    api.post('/auth', values)
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => console.log('ERRO NA CHAMADA:', error))
}

const registerService = {
  registerValues: (values: userObj) => 
    api.post('/usuario', values)
    .then((response: any) => response)
    .catch((error: any) => error.response)
}

const userLoggedService = {
  userLogged: () =>
    api.get('/usuario/findByEmail')
    .then((response:any) => response)
    .then((response: any) => response)
    .catch((error: any) => {
      swal({
        title: 'Erro!',
        text: `${error.message}`,
        icon: 'error',
        timer: 7000
      })
    })
}

// const profileLoggedService = {
//   profileLogged: () =>
//     api.get('/perfil/findOne')
//     .then((response:any) => response)
//     .then((response: any) => response)
//     .catch((error: any) => {
//       swal({
//         title: 'Erro!',
//         text: `${error.message}`,
//         icon: 'error',
//         timer: 7000
//       })
//     })
// }

export { loginService, registerService, userLoggedService };