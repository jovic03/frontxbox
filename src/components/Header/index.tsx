import './style.css';

import { RiLogoutCircleLine } from 'react-icons/ri';

const Header = () => {
  return (
    <header>
      <div className='header-logout'/>
      {/* <section> */}
        <div className='favorite-text'>
          <div className='favorite-button'>
            FAVORITOS
          </div>
        </div>
        <button className='header-button'></button>
      {/* </section> */}
    </header>
  )
}

export default Header