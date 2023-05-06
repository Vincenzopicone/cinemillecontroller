import { Link } from 'react-router-dom';
import {BsFilm} from 'react-icons/bs';

function NavBar() {
  return (
    <nav className='navBar p-4'>
      <Link to={'/'} className='text-decoration-none text-dark'><h2 className='titleNavBar'><span><BsFilm/></span> CineMille</h2></Link>
      <section className='d-flex justify-content-center pt-3'>
      <Link to={'/'} className='text-decoration-none text-dark me-5'><h5 >Crea la programmazione</h5></Link>
      <Link to={'/film'} className='text-decoration-none text-dark me-5'><h5 >Film</h5></Link>
      <Link to={'/sale'} className='text-decoration-none text-dark'><h5 >Sale</h5></Link>
      </section>
    </nav>

  );
}

export default NavBar;