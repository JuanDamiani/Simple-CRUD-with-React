import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ListadoCategoria() {

    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    const traerCategorias = async() => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/categoria');
            setListado(respuesta.data);
            setError('');
        } catch(e) {
            if (e.message === 'Network Error') {
                toast.error("No me pude conectar con el servidor");
            } else {
                toast.error(e.message);
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
            if (e.message === 'Network Error') {
                toast.error("No me pude conectar con el servidor");
            } else {
                toast.error("No puedes eliminar esta categoría");
            }
        }
    }


    return (
        <div className="container">
            <ToastContainer />
            <div className="col-12">
                <div className="col-12 d-flex flex-direction-row justify-content-between align-items-center my-4">
                    <h2>Listado de categorías</h2>
                    <Link to={"/categorias/agregar"} className="btn btn-primary">Agregar</Link>
                </div>
            </div>
            <table className="table">
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
        </div>
    )
}
