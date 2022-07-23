import Header from '../../components/Header/index';
import "./style.css";
import Card from '../../components/Card/index';
import swall from 'sweetalert';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findAllService } from '../../services/jogoService';
import { userLoggedService } from '../../services/authService';

interface Games {
  id?: string;
  title :string;
  coverImageUrl:string;
  description:string;
  year:string;
  imdbScore:string;
  trailerYouTubeUrl:string;
  gameplayYouTubeUrl:string;
}

interface User {
  email: string;
  name: string;
  id: string;
}

const Home = () => {
  const [games, setGames] = useState<Games[]>([]);
  const [refreshGames, setRefreshGames] = useState(false);
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

  const updateGames = (refreshChar: boolean) => { 
    setRefreshGames(refreshChar);
    setTimeout(() => {
      setRefreshGames(false);
    }, 100);
  }

  useEffect(() => {
    getAllGames();
    getUserLogged();
  }, [refreshGames]);

  const getAllGames = async () => {
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
        setGames(response.data.results);
      }

    }
  }

  return (
    <main>
      <Header/>
      <section className='list-cards'>
        <div className='card-container'>
          {games.map((game:Games, index) => (
            <Card jogo={game} key={index} />
          ))}
        </div>
        <button className='btn-view-more'>Ver mais</button>
      </section>
    </main>
  )
}

export default Home