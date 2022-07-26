import "./style.css";
import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import { BiX } from 'react-icons/bi';
import { createService } from '../../services/jogoService';
import swal from 'sweetalert';

Modal.setAppElement('#root');

interface JogoObj {
  title: string;
  coverImageUrl: string;
  description: string;
  year: string;
  imdbScore: string;
  trailerYouTubeUrl: string;
  gameplayYouTubeUrl: string;
}

interface modalProps {
  isOpen: boolean; // define se o modal vai ser aberto
  closeModal: any; // recebe uma funcao para fechar o modal
  onChanges: any;
  type: string; // createCharacter EditCharacter
  title: string; // title = titulo do modal
  btnName: string; // texto do botao
  id: string; // id do jogo (em caso de edicao)
}

const Modals = ({
  isOpen,
  closeModal,
  type,
  title,
  btnName,
  onChanges,
  id,
}: modalProps) => {
  const [jogo, setJogo] = useState({
    title: "",
    coverImageUrl: "",
    description: "",
    year: "",
    imdbScore:"",
    trailerYouTubeUrl: "",
    gameplayYouTubeUrl: "",
  });

  const handleChangeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJogo((values: JogoObj) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const createJogo = async () => {
    const response = await createService.createJogo(jogo);

    if(response.status === 200) {
      swal({
        title: 'Sucesso!',
        text: 'Jogo criado com sucesso!',
        icon: 'success',
        timer: 7000
      })
      onChanges(true);
      closeModal();
    }
  }

  const editJogo = () =>{
    console.log('edicao');
  }

  const submitFunction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch(type) {
      case "createJogo":
        createJogo();
      case "editJogo":
        editJogo();
      break;
    }

  };


  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        overlayClassName="overlay-react-modal"
        className="content-react-modal"
      >
        <button
          type="button"
          className="close-modal-button"
          onClick={closeModal}
        >
          <BiX/>
        </button>
        <h2 className="modal-title">{title}</h2>
        <form onSubmit={submitFunction}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Nome do jogo"
            onChange={handleChangeValues}
            defaultValue={jogo.title}
          />
          <input
            type="text"
            name="coverImageUrl"
            id="coverImageUrl"
            placeholder="Imagem do jogo"
            onChange={handleChangeValues}
            defaultValue={jogo.coverImageUrl}
          />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Descrição do jogo"
            onChange={handleChangeValues}
            defaultValue={jogo.description}
          />
          <input
            type="text"
            name="year"
            id="year"
            placeholder="Ano de lançamento"
            onChange={handleChangeValues}
            defaultValue={jogo.year}
          />
                    <input
            type="text"
            name="trailerYouTubeUrl"
            id="trailerYouTubeUrl"
            placeholder="Link do trailer do YouTube"
            onChange={handleChangeValues}
            defaultValue={jogo.trailerYouTubeUrl}
          />
                    <input
            type="text"
            name="gameplayYouTubeUrl"
            id="gameplayYouTubeUrl"
            placeholder="Link do gameplay do YouTube"
            onChange={handleChangeValues}
            defaultValue={jogo.gameplayYouTubeUrl}
          />
          <button type="submit">{btnName}</button>
        </form>
      </Modal>
    </div>
  );
};

export default Modals;