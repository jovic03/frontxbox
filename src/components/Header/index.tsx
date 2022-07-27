import { useState } from "react";
import "./style.css";
import Modals from '../Modals';
import { RiLogoutCircleLine } from 'react-icons/ri';


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
    return (
      <header className="header">

        <section className="flex">
          <div className="nome-perfil">Ezio Auditore</div>
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
              <a> 06/07/2022 16:09</a>
            </li>
            
          </ul>
        </nav>

        <Modals
          isOpen={isModalOpen}
          closeModal={closeModal}
          type="createCharacter"
          title='Criar Personagem'
          onChanges={onCreate}
          btnName="Salvar"
          id=""
        />

      </header>
    );
  };


export default Header
