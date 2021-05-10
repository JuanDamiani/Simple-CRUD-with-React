


            import React from 'react';
            import axios from 'axios';
            import { ToastContainer, toast } from 'react-toastify';
            import 'react-toastify/dist/ReactToastify.css';
            
            export default function Prestar(props) {
                const [libros, setLibros] = React.useState([]);
                const [personas, setPersonas] = React.useState([]);
                const [form, setForm] = React.useState(
                    {nombre:"", 
                    descripcion:"", 
                    categoria_id: "", 
                    persona_id: "",
                });
            
                const obtenerLibro = async () => {
                    try {
                        const respuesta = await axios.get('http://localhost:3000/api/libro').
                        then((respuesta) => setLibros(respuesta.data)) 
                    } catch (e) {
                        if (e.message === 'Network Error') {
                            toast.error("No me pude conectar con el servidor");
                        } else {
                            toast.error(e.message);
                        }
                    }
                };
            
                const obtenerPersonas = async () => {
                    try {
                        const respuesta = await axios.get('http://localhost:3000/api/persona').
                        then((respuesta) => setPersonas(respuesta.data))
                    } catch (e) {
                        if (e.message === 'Network Error') {
                            toast.error("No me pude conectar con el servidor");
                        } else {
                            toast.error(e.message);
                        }
                    }
                };
            
                React.useEffect(() => {
                    obtenerLibro();
                }, []);
            
                React.useEffect(() => {
                    obtenerPersonas();
                }, []);
            
                const handleChangeNombre = e => {
                    // e.target.value
                    const nuevoState = JSON.parse(JSON.stringify(form));
                    nuevoState.nombre = e.target.value;
                    setForm(nuevoState);
                };
                const handleChangeApellido = e => {
                    // e.target.value
                    const nuevoState = JSON.parse(JSON.stringify(form));
                    nuevoState.Apellido = e.target.value;
                    setForm(nuevoState);
                };
                           
                const handleChangePersona_id = e => {
                    // e.target.value
                    const nuevoState = JSON.parse(JSON.stringify(form));
                    nuevoState.persona_id = e.target.value;
                    setForm(nuevoState);
                };
              
                const guardar = async () => {
                    // form
                    try {
                    await axios.post('http://localhost:3000/api/libro', form);
                    props.history.push('/libros');}
                    catch(e) {
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
                                <h2>Prestar  libros</h2>
                            </div>
                            <div className="col-8 mx-auto">
                                <div className=" m-4 p-3 bg-light">
                                    <form className="row">
                                        <div className="col-12">
                                        <select name="nombre" id="input3" onChange={handleChangeNombre} className="form-select">
                                                <option selected>Seleccione un libro</option>
                                                {libros.map(unlibro => (
                                                    <option value={unlibro.id}>
                                                        {unlibro.nombre}
                                                        
                                                    </option>
                                                   
                                                ))}
                                            </select>                       
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="input2" className="form-label mt-3">ESTADO</label>
                                        
                                            <p> (estado) </p>
                                                 </div>
                                                                              <div className="col-12">
                                            <label htmlFor="input4" className="form-label mt-3">Persona</label>
                                            <select name="persona_id" id="input4" onChange={handleChangePersona_id} className="form-select">
                                                <option selected>Seleccione una persona</option>
                                                {personas.map(unaPersona => (
                                                    <option value={unaPersona.id}>
                                                        {unaPersona.nombre}
                                                    </option>
                                                ))}
                                            </select>                                                                
                                        </div>                        
                                    </form>
                                    <button onClick={guardar} className="btn btn-primary mt-4">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>    
                );
            
            }