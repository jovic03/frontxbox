import './style.css'
import { useState } from 'react';
import { loginService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import swall from 'sweetalert';


interface userLoginObj {
  email: string;
  password: string;
}

const Login = (props: any) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  let navigate = useNavigate();

  const handleChangesValues = (event: React.ChangeEvent<HTMLInputElement>)  => {
    // faco uma copia do objeto no estado (values) e adiciono as pripriedades digitadas pelo usuario
    // após isso retorno para a função que vai atualizar esse valor no estado da aplicação.
    setValues((values: userLoginObj) => ({
      ...values,
      [event.target.name]: event.target.value
    }))
  }
  


  const loginUser = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const response = await loginService.login(values)
    // debugger;
    const jwt = response.data.token;

    const userId = response.data.id;

    if(jwt) {
      localStorage.setItem('jwtLocalStorage', jwt);
      swall({
        title: 'Seja bem vindo',
        icon: 'success',
        timer: 3000,
      })
      navigate(`/usuario/${userId}/perfil`);
    }
    console.log(response.data);
  }

  return (
    <section className="login-container">
      <div className="login-card">
        <div className="logoLogin-container">
          <div className="logo-xbox"/>
          <h2>Login</h2>
        </div>
        <form onSubmit={loginUser} className="form-login">
          <input type="email" name="email" id="email" placeholder="Digite o seu Email" onChange={handleChangesValues}/>
          <input type="password" name="password" id="password" placeholder="Digite a sua senha" onChange={handleChangesValues}/>
          <button>Entrar</button>
        </form>
        <p>Não tem conta ? <Link to="/register" className='link-register'>Cadastre-se</Link></p>
      </div>
    </section>
  )
}

export default Login