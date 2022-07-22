import { useState } from 'react';
import { registerService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

interface userObj {
  name: string;
  email: string;
  password: string;
  passwordConfirmation:string,
  cpf:string
}

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    cpf:''
  })

  let navigate = useNavigate();

  const handleChangeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((values: userObj) => ({
      ...values,
      [event.target.name]: event.target.value
    }))
  };

  const registerUser = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const response = await registerService.registerValues(values);
    const userId = response.data.id;

    if(userId) {
      swal({
        title: 'Usuário cadastrado com sucesso !',
        icon: "success",
        timer: 7000,
      })
      navigate(`/usuario/${userId}/perfil`)//vai retonar o perfil logado
    }else {
      swal({
        title: 'Erro!',
        text: `${response.data.message}`,
        icon: 'error',
        timer: 7000
      })
    }

  }


  return (
    
    <section className="login-container">
      <div className="login-card">
        <h2>Cadastro</h2>
        <form onSubmit={registerUser}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Digite o seu nome"
            onChange={handleChangeValues}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Digite seu email"
            onChange={handleChangeValues}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua password"
            onChange={handleChangeValues}
          />

          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="Digite sua password"
            onChange={handleChangeValues}
          />
          <input
            type="text"
            name="cpf"
            id="cpf"
            placeholder="Digite seu cpf"
            onChange={handleChangeValues}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </section>
  );
};

export default Register;