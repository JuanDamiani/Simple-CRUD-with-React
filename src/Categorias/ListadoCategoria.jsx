import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function ListadoCategoria() {

    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    const traerCategorias = async() => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/categoria');
            setListado(respuesta.data);
            setError('');
        } catch(e) {
            if (e.message=='Network error') {
                setError('No me pude conectar con el servidor');
            } else {
                setError('Otro mensaje que venga del server');
            }
        }
    }

    React.useEffect(() => {
        traerCategorias();
    }, [])

    const borrarCategoria = async(idCategoriaABorrar) => {
        try {
            await axios.delete('http://localhost:3000/api/categoria/' + idCategoriaABorrar)
            traerCategorias();
        } catch(e) {
           console.log(e.message)
        }
    }


    return (
        <div>
            <Link to={"/categorias/agregar"}>Agregar</Link>
            {error ? <>Error en la conexión</> : <></>}
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listado.map(unaCategoria => (
                        <tr>
                            <td>{unaCategoria.nombre}</td>
                            <td>
                                <Link to={"/categorias/editar/"+unaCategoria.id.toString()}>Editar</Link> |&nbsp;
                                <Link onClick={() => borrarCategoria(unaCategoria.id)}>Borrar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/" >Home</Link>
        </div>
        
    )
}
