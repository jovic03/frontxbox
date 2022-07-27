import { useState } from "react";
import "./style.css";
import Modals from '../Modals';
import { DateTime } from "luxon";
import { profileLoggedService } from "../../services/authService";


interface headerProps {
  updateJogo: (arg: boolean) => void;
}

  const Header = ({updateJogo}: headerProps) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
      setIsModalOpen(true);
    }
  
    const closeModal = () => {
      setIsModalOpen(false);
    }
  
    const onCreate = () => {
      updateJogo(true);
    }


    const dateDescription = DateTime.now().toLocaleString({
      ...DateTime.DATE_SHORT,
      weekday: "long",
    });

    return (
      <header className="header">

        <section className="flex">
          <div className="nome-perfil"></div>
          <a className="foto-perfil" href="/" title="Foto de perfil"></a>
        </section>

        <nav className="flex-container">
          <ul className="menu">
            <a href="/profileSelection">
              <div className="button" >
                <li className="btn-icone" />
                <li className="btn-texto">VOLTAR</li>
              </div>
            </a>
            <li className="btn-addgame" onClick={openModal}/>

            <li className="time-hour">
              <a> {dateDescription}</a>
            </li>
            
          </ul>
        </nav>

        <Modals
          isOpen={isModalOpen}
          closeModal={closeModal}
          type="createCharacter"
          title='Criar Jogo'
          onChanges={onCreate}
          btnName="Salvar"
          id=""
        />

      </header>
    );
  };


export default Header
