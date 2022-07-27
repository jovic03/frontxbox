// import Header from '../../components/Header/index';
// import "./style.css";
// import Card from '../../components/Card/index';
// import swall from 'sweetalert';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { findAllService } from '../../services/jogoService';
// import { profileLoggedService } from '../../services/authService';

// interface Jogo {
//   id: string;
//   title :string;
//   coverImageUrl:string;
//   description:string;
//   year:string;
//   imdbScore:string;
//   trailerYouTubeUrl:string;
//   gameplayYouTubeUrl:string;
//   profileId:string;
// }

// interface Perfil {
//   id: string;
//   title: string;
// }

// const Home = () => {
//   const [jogo, setJogo] = useState<Jogo[]>([]);
//   const [refreshJogo, setRefreshJogo] = useState(false);
//   const [profileLogged, setProfileLogged] = useState<Perfil>({
//     id: '',
//     title: '',
//   });

//   const navigate = useNavigate();

//   const jwt = localStorage.getItem('jwtLocalStorage')

//   const getProfileLogged = async () => {
//     const response = await profileLoggedService.profileLogged();
//     setProfileLogged(response.data)
//   }


//   useEffect(() => {
//     getAllJogo();
//     getProfileLogged();
//   }, [refreshJogo]);

//   const updateJogo = (refreshJogo: boolean) => { 
//     setRefreshJogo(refreshJogo);
//     setTimeout(() => {
//       setRefreshJogo(false);
//     }, 100);
//   }

//   const getAllJogo = async () => {
//     if(!jwt) {
//       swall({
//         title: 'ERRO!',
//         text: 'Faça o login antes de entrar na página inicial',
//         icon: 'error',
//         timer: 7000,
//       })
//       navigate('/login')
//     } else {
//       const response = await findAllService.allJogo();

//       if(response.status === 204) {
//         swall({
//           title: 'Info',
//           text: 'Não existe jogo cadastrado!',
//           icon: 'info',
//           timer: 7000,
//         })
//       }else {
//         // console.log('Jogos exibidos', response);
//         setJogo(response.data.results);
//       }

//     }
//   }

//   return (
//     <main>
//       <Header updateJogo={updateJogo}/>
//       <section className='list-cards'>
//         <div className='card-container'>
//           {jogo.map((jogo:Jogo, index) => (
//             <Card jogo={jogo} 
//               key={index} 
//               updateJogo={updateJogo} 
//               profileLogged={profileLogged} 
//             />
//           ))}
//         </div>
//         <button className='btn-view-more'>Ver mais</button>
//       </section>
//     </main>
//   )
// }

// export default Home








import Header from '../../components/Header/index';
import "./style.css";
import Card from '../../components/Card/index';
import swall from 'sweetalert';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findAllService } from '../../services/jogoService';
import { profileLoggedService } from '../../services/authService';
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
  jogo: {
    id: string;
    title :string;
    coverImageUrl:string;
    description:string;
    year:string;
    imdbScore:string;
    trailerYouTubeUrl:string;
    gameplayYouTubeUrl:string;
    profileId: string;
  }
}

const Home = () => {
  // const [jogo, setJogo] = useState<Jogo[]>([]);
  const [home, setHome] = useState<Homepage[]>([]);
  const [refreshJogo, setRefreshJogo] = useState(false);
  const [profileLogged, setProfileLogged] = useState<Perfil>({
    id: '',
    title: '',
  });

  const navigate = useNavigate();

  const jwt = localStorage.getItem('jwtLocalStorage')

  const getProfileLogged = async () => {
    const response = await profileLoggedService.profileLogged();
    setProfileLogged(response.data)
  }


  useEffect(() => {
    getAllJogo();
    getProfileLogged();
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
        // console.log('Jogos exibidos', response);
        setHome(response.data.results);
      }

    }
  }

  return (
    <main>
      <Header updateJogo={updateJogo}/>
      <section className='list-cards'>
        <div className='card-container'>
          {home.map((jogo:Homepage, index) => (
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