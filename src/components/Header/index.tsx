import './style.css';

const Header = () => {
  return (
<header className="header">
    <section className="flex">
        <div className="nome-perfil">Ezio Auditore</div>
        <a className="foto-perfil" href="/" title='Foto de perfil'></a>
    </section>
    <nav className='flex-container'>
        <ul className="menu">

            <div className="button">
                <li className="btn-icone"/>
                <li className="btn-texto">VOLTAR</li>
            </div>

            <li  className="btn-addgame" />

            <li className="time-hour">
                <a> 06/07/2022 16:09</a>
            </li>
        </ul>
    </nav>
  </header>
  )
}

export default Header