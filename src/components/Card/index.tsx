import './style.css';
import { useState } from 'react';
import swal from 'sweetalert';
import Modals from '../Modals';



interface cardProps {
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
  },
  updateJogo:(arg: boolean) => void;
  userLogged: {
    email: string,
    name: string,
    id: string,
  }
} 


const Card = ({ jogo, userLogged, updateJogo  }: cardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if(userLogged.id === jogo.profileId) {
      setIsModalOpen(true);
    } else {
      swal({
        title: 'Erro !',
        text: 'Voce só pode alterar o jogo que voce criou',
        icon: 'error',
        timer: 7000
      })
    }
  }
  //se o id usuario for igual o id do usario que cadastrou esse personagem


  function closeModal() {
    setIsModalOpen(false);
  }

  function onEdit() {
    updateJogo(true);
  }

  return (
    <>
      <div className='card' onClick={openModal}>
        <img src={jogo.coverImageUrl} className="character-image" alt="Imagem do jogo" />
        <div>
          <h2>{jogo.title}</h2>
          <p>{jogo.description}</p>
          <p>{jogo.year}</p>
          <p>{jogo.imdbScore}</p>
          <p>{jogo.trailerYouTubeUrl}</p>
          <p>{jogo.gameplayYouTubeUrl}</p>
          <span className='user-card'>By: {jogo.profileId}</span>
        </div>
      </div>

      <Modals
        isOpen={isModalOpen}
        closeModal={closeModal}
        type="editJogo"
        title="Editar jogo"
        btnName='Atualizar'
        onChanges={onEdit}
        id={jogo.id}
      />

    </>
  )
}

export default Card