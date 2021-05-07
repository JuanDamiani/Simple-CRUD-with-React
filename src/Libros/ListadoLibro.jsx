import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
// falta Se tiene que poder ver los libros que tiene una persona prestados (es decir, los libros que le preste)
export default function ListadoLibro() {

    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    const traerLibros = async() => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/libro');
            setListado(respuesta.data);
            setError('');
        } catch(e) {
            if (e.message === 'Network error') {
                setError('No me pude conectar con el servidor');
            } else {
                setError('Otro mensaje que venga del server');
            }
            console.log(error);
        }
    }

    React.useEffect(() => {
        traerLibros();
    }, [])

    const borrarLibro = async(idLibroABorrar) => {
        try {
            await axios.delete('http://localhost:3000/api/libro/' + idLibroABorrar.toString());
            traerLibros();
        } catch(e) {
            console.log(e.message)

        }
    }


    return (
        <div>
            <Link to={"/libros/agregar"}>Agregar</Link>
            {error ? <>Error en la conexión</> : <></>}
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Id de la persona</th>
                        <th>Id de la categoria</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listado.map(unLibro => (
                        <tr>
                            <td>{unLibro.nombre}</td>
                            <td>{unLibro.descripcion}</td>
                            <td>{unLibro.persona_id}</td>
                            <td>{unLibro.categoria_id}</td>
                            <td>
                                <Link to={"/libros/editar/"+ unLibro.id.toString()}>Editar</Link> |&nbsp;
                                <Link onClick={() => borrarLibro(unLibro.id)}>Borrar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
                    }

