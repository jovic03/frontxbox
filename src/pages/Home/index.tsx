import Header from '../../components/Header/index';
import "./style.css";
import Card from '../../components/Card/index';
import swall from 'sweetalert';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findAllService } from '../../services/jogoService';
import { userLoggedService } from '../../services/authService';

interface Jogo {
  id: string;
  title :string;
  coverImageUrl:string;
  description:string;
  year:string;
  imdbScore:string;
  trailerYouTubeUrl:string;
  gameplayYouTubeUrl:string;
  profileId:string;
}

interface User {
  email: string;
  name: string;
  id: string;
}

const Home = () => {
  const [jogo, setJogo] = useState<Jogo[]>([]);
  const [refreshJogo, setRefreshJogo] = useState(false);
  const [userLogged, setUserLogged] = useState<User>({
    email: '',
    name: '',
    id: ''
  });

  const navigate = useNavigate();

  const jwt = localStorage.getItem('jwtLocalStorage')

  const getUserLogged = async () => {
    const response = await userLoggedService.userLogged();
    setUserLogged(response.data)
  }


  useEffect(() => {
    getAllJogo();
    getUserLogged();
  }, [refreshJogo]);

  const updateJogo = (refreshJogo: boolean) => { 
    setRefreshJogo(refreshJogo);
    setTimeout(() => {
      setRefreshJogo(false);
    }, 100);
  }

  const getAllJogo = async () => {
    if(!jwt) {
      swall({
        title: 'ERRO!',
        text: 'Faça o login antes de entrar na página inicial',
        icon: 'error',
        timer: 7000,
      })
      navigate('/login')
    } else {
      const response = await findAllService.allJogo();

      if(response.status === 204) {
        swall({
          title: 'Info',
          text: 'Não existe jogo cadastrado!',
          icon: 'info',
          timer: 7000,
        })
      }else {
        console.log('Jogos exibidos', response);
        setJogo(response.data.results);
      }

    }
  }

  return (
    <main>
      <Header updateJogo={updateJogo}/>
      <section className='list-cards'>
        <div className='card-container'>
          {jogo.map((jogo:Jogo, index) => (
            <Card jogo={jogo} key={index} updateJogo={updateJogo} userLogged={userLogged} />
          ))}
        </div>
        <button className='btn-view-more'>Ver mais</button>
      </section>
    </main>
  )
}

export default Home