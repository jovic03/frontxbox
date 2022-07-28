import Header from '../../components/Header/index';
import "./style.css";
import Card from '../../components/Card/index';
import swall from 'sweetalert';
import { useEffect, useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import { findAllService } from '../../services/jogoService';
import { findProfileById } from '../../services/profilesService';
import { homepage } from '../../services/homepage';

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

interface Perfil {
  id: string;
  title: string;
}

interface Homepage{
  id:string;
  title:string;
  ImageURL:string;
  userId:string;
  jogoFavorito:string[];
  jogos:Jogo[];

}



const Home = () => {
  const [jogo, setJogo] = useState<Jogo[]>([]);
  const [home, setHome] = useState<Homepage>({
    id:'',
    title:'',
    ImageURL:'',
    userId:'',
    jogoFavorito:[],
    jogos:[],
  });
  const [refreshJogo, setRefreshJogo] = useState(false);
  const [profileLogged, setProfileLogged] = useState<Homepage>({
    id:'',
    title:'',
    ImageURL:'',
    userId:'',
    jogoFavorito:[],
    jogos:[],
  });
  const { state }: any = useLocation();
  // console.log(state)

  const navigate = useNavigate();

  const jwt = localStorage.getItem('jwtLocalStorage')

  const getProfileLogged = async () => {
    // const userId = localStorage.getItem('idUser')
    if(state.id){
      const response = await findProfileById.findProfileById(state.id);
      console.log(response.data)
      setProfileLogged(response.data) 
    }

  }


  useEffect(() => {
    getAllJogo();
    getProfileLogged();
    getHomeValues();
  }, [refreshJogo]);

  const updateJogo = (refreshJogo: boolean) => { 
    setRefreshJogo(refreshJogo);
    setTimeout(() => {
      setRefreshJogo(false);
    }, 100);
  }

  const getHomeValues = async ()=>{
    console.log(profileLogged.id)
    if(state.id){
      const response = await homepage.homepage(state.id);
      setHome(response.data)
      console.log(response.data)
    }

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
        // console.log('Jogos exibidos', response);
        setJogo(response.data.results);
        // setHome(response.data.results);
      }

    }
  }

  return (
    <main>
      <Header profileLogged={profileLogged} updateJogo={updateJogo}/>
      <section className='list-cards'>
        <div className='card-container'>
          {profileLogged.jogos.map((jogo:Jogo, index) => (
            <Card jogo={jogo} 
              key={index} 
              updateJogo={updateJogo} 
              profileLogged={profileLogged} 
            />
          ))}
        </div>
        <button className='btn-view-more'>Ver mais</button>
      </section>
    </main>
  )
}

export default Home