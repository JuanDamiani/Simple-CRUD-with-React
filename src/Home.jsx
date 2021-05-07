import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
  
  return (
    <ul>
    <li>
        <Link to="/personas">Personas</Link>
    </li>

    <li>
    <Link to="/categorias">Categorias</Link>
    </li>
    <li>
    <Link to="/libros">Libros</Link>
    </li>
</ul>
  )
  }