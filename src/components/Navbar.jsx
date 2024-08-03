import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="menu">
      <NavLink to={'/'}>Home</NavLink>
      <NavLink to={'/admin'}>Admin</NavLink>
      <NavLink to={'/editor'}>Editor</NavLink>
      <NavLink to={'/login'}>Login</NavLink>
    </nav>
  );
};

export default Navbar;
