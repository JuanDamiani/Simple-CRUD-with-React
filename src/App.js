import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from './Home';

import AltaPersona from './Personas/AltaPersona';
import EditarPersona from './Personas/EditarPersona';
import ListadoPersonas from './Personas/ListadoPersonas';

/*import AltaCategoria from './Genero/AltarCategoria';
import EditarCategoria from './Genero/EditarCategoria';
import ListadoCategoria from './Genero/listado-categoria';

import AltaLibro from './Libro/AltaLibro';
import EditarLibros from './Libro/listado-generos';
import ListadoLibros from './Libro/listado-libros';*/







function App() {
  return (
    <div className="App">
      <Router>
      <Route exact path="/" component={Home} />

      <Route exact path="/personas" component={ListadoPersonas} />
      <Route exact path="/personas/editar/:id" component={EditarPersona} />
      <Route exact path="/personas/agregar" component={AltaPersona} />


      </Router>
    </div>
  );
}

export default App;
