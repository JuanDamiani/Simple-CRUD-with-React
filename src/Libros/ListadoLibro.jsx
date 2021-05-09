import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ListadoLibro() {

    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    const traerLibros = async() => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/libro');
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
        traerLibros();
    }, [])

    const borrarLibro = async(idLibroABorrar) => {
        try {
            await axios.delete('http://localhost:3000/api/libro/' + idLibroABorrar.toString());
            toast.success("Realizado!")
            traerLibros();
        } catch(e) {
            if (e.message === 'Network Error') {
                toast.error("No me pude conectar con el servidor");
            } else {
                toast.error(e.message);
            }
        }
    }


    return (
        <div className="container">
            <ToastContainer />
            <div className="col-12">
                <div className="col-12 d-flex flex-direction-row justify-content-between align-items-center my-4">
                    <h2>Listado de libros</h2>
                    <Link to={"/libros/agregar"} className="btn btn-primary">Agregar</Link>
                </div>
                <table className="table">
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
                                    <Link onClick={() => borrarLibro(unLibro.id.toString())}>Borrar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
                    }

