import "./style.css";
import React from "react";
import Modal from "react-modal";
import { useState , useEffect} from "react";
import { BiX } from 'react-icons/bi';
import { createService,findByIdService,updateService,deleteService } from '../../services/jogoService';
import swal from 'sweetalert';
import { BsFillTrashFill } from "react-icons/bs";

Modal.setAppElement('#root');

interface jogoObj {
  title :string;
  coverImageUrl:string;
  description:string;
  year:string;
  imdbScore:string;
  trailerYouTubeUrl:string;
  gameplayYouTubeUrl:string;
}

interface modalProps {
  isOpen: boolean; // define se o modal vai ser aberto
  closeModal: any; // recebe uma funcao para fechar o modal
  onChanges: any;
  type: string; // createCharacter EditCharacter
  title: string; // title = titulo do modal
  btnName: string; // texto do botao
  id: string; // id do personagem (em caso de edicao)
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
  const [formDetails, setFormDetails] = useState({
    id,
    title,
    btnName,
    type
  })
  const [jogo, setJogo] = useState({
    title: "",
    coverImageUrl: "",
    description: "",
    year: "",
    imdbScore: "",
    trailerYouTubeUrl: "",
    gameplayYouTubeUrl: "",
  });

  useEffect(()=> {
    setFormDetails({
      id: id,
      title: title,
      btnName: btnName,
      type: type,
    })

    // chamar a api ou fazer algo
    type === 'editJogo' && isOpen ? getJogoById() : '';
    type === 'createJogo' ? setJogo({
      title: "",
      coverImageUrl: "",
      description: "",
      year: "",
      imdbScore: "",
      trailerYouTubeUrl: "",
      gameplayYouTubeUrl: "",
    }) : console.log('Impedindo modal de fazer algo');

  }, [isOpen])

  const handleChangeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJogo((values: jogoObj) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  //buscar os dados do jogo por id para popular os campos do meu input
  const getJogoById = async () => {
    const response = await findByIdService.findJogoById(id);
    setJogo(response.data);
  }

  const createJogo = async () => {
    const response = await createService.createJogo(jogo);

    if(response.status === 200) {
      exibeAlerta('Jogo criado com sucesso!', 'success', 'Sucesso!')
      onChanges(response);
      closeModal();
    }
  }

  const editJogo = async () =>{
    const response = await updateService.updateJogo(jogo, id);
    exibeAlerta('Jogo Atualizado com sucesso!', 'success', 'Sucesso!')
    onChanges(response);
    closeModal();
  }

  const deleteModalOpen = () => {//*********************************** */
    swal({
      title: 'Deseja apagar o jogo ?',
      icon: 'error',
      buttons: ["Não", "Sim"]
    }).then((resp) => {
      console.log(resp)
      if(resp) {
        deleteJogo();
      }
    })
  }

  const deleteJogo = async () => {
    const response = await deleteService.deleteJogo(id);
    exibeAlerta('Jogo apagado com sucesso!', 'success', 'sucesso')
    onChanges(response);
    closeModal();
  }

  const exibeAlerta = (text: string, icon: string, title: string) => {
    swal({
      title: title,
      text: text,
      icon: icon,
      timer: 7000
    })
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
        <h2 className="modal-title">{formDetails.title}</h2>
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
            placeholder="Descricao do jogo"
            onChange={handleChangeValues}
            defaultValue={jogo.description}
          />
          <input
            type="text"
            name="year"
            id="year"
            placeholder="Ano do jogo"
            onChange={handleChangeValues}
            defaultValue={jogo.year}
          />
          <input
            type="text"
            name="imdbScore"
            id="imdbScore"
            placeholder="IMDB Score do jogo"
            onChange={handleChangeValues}
            defaultValue={jogo.imdbScore}
          />
          <input
            type="text"
            name="trailerYouTubeUrl"
            id="trailerYouTubeUrl"
            placeholder="Trailer do jogo"
            onChange={handleChangeValues}
            defaultValue={jogo.trailerYouTubeUrl}
          />
          <input
            type="text"
            name="gameplayYouTubeUrl"
            id="gameplayYouTubeUrl"
            placeholder="Gameplay do jogo"
            onChange={handleChangeValues}
            defaultValue={jogo.gameplayYouTubeUrl}
          />
          <button type="submit">{formDetails.btnName}</button>
        </form>
        {type === 'editJogo' ? (
          <div className="delete-jogo" onClick={deleteModalOpen}>
            <span>ou</span>
            <button>Apagar <BsFillTrashFill className="trash-icon"/></button>
          </div>
        ): ''}
      </Modal>
    </div>
  );
};

export default Modals;