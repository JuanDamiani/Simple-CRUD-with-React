import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// falta Se tiene que poder ver los libros que tiene una persona prestados (es decir, los libros que le preste)
export default function ListadoPersona() {

    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    const traerPersonas = async() => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/persona');
            setListado(respuesta.data);
        } catch(e) {
            if (e.message === 'Network Error') {
                toast.error("No me pude conectar con el servidor");
            } else {
                toast.error(e.response.data.message);
            }
        }
    }

    React.useEffect(() => {
        traerPersonas();
    }, [])

    const borrarPersona = async(idPersonaABorrar) => {
        try {
            await axios.delete('http://localhost:3000/api/persona/' + idPersonaABorrar.toString());
            toast.success("Realizado!")
            
            traerPersonas();
        } catch(e) {
            toast.error(e.response.data.message)
           
           
        }
    }

    return (
        <div className="container">
            <ToastContainer />
            <div className="col-12">
                <div className="col-12 d-flex flex-direction-row justify-content-between align-items-center my-4">
                <h2>Listado de personas</h2>                
                <Link to={"/personas/agregar"} className="btn btn-primary">Agregar</Link>                
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Alias</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                  
                    </thead>
                    <tbody>
                        {listado.map(unaPersona => (
                            <tr>
                                <td>{unaPersona.nombre}</td>
                                <td>{unaPersona.apellido}</td>
                                <td>{unaPersona.alias}</td>
                                <td>{unaPersona.email}</td>
                                <td>
                                    <Link to={"/personas/editar/"+unaPersona.id.toString()}>Editar</Link> |&nbsp;
                                    <Link onClick={() => borrarPersona(unaPersona.id)}>Borrar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
                    }

