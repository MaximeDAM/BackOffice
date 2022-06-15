import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="/profil">Profil</a>
        </li>
        <li>
            <Link to="/projects">Projets</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar