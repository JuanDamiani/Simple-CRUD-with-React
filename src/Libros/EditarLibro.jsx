import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditarLibro(props) {
    const [categorias, setCategorias] = React.useState([]);
    const [personas, setPersonas] = React.useState([]);
    const params = useParams();
    const [form, setForm] = React.useState({
        nombre: '', 
        descripcion: '', 
        categoria_id: '', 
        persona_id: '',
    });

    const obtenerCategorias = async () => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/categoria').
            then((respuesta) => setCategorias(respuesta.data)) 
        } catch (e) {
            console.log(e.message)
        }
    }

    const obtenerPersonas = async () => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/persona').
            then((respuesta) => setPersonas(respuesta.data))
        } catch (e) {
            console.log(e.message)
        }
    };

    const buscarLibroPorId = async(idLibro) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/libro/'+idLibro).
            then((response) => setForm({nombre: response.data.nombre, descripcion: response.data.descripcion, categoria_id: response.data.categoria_id, persona_id: response.data.persona_id}))
        } catch(e) {
            console.log(e.message);
        }
    }

    React.useEffect(() => {
        obtenerCategorias();
    }, []);

    React.useEffect(() => {
        obtenerPersonas();
    }, []);

    React.useEffect(() => {
        if (!params.id) return;
        buscarLibroPorId(params.id)
    }, [params])

    const handleChangeNombre = (e) => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeDescripcion = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.descripcion = e.target.value;
        setForm(nuevoState);
    };

    const handleChangeCategoria_id = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.categoria_id = e.target.value;
        setForm(nuevoState);
    };

    const handleChangePersona_id = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.persona_id = e.target.value;
        setForm(nuevoState);
    }

    // const guardar = async() => {
    //     // form 
    //     try {
    //         await axios.put('http:/localhost:3000/api/libro/'+ params.id, form);
    //         props.history.push('/libros');            
    //     } catch(e) {
    //         console.log(e.message);
    //     }
    // }

    const guardar = async() => {
        // form
         try {
            await axios.put('http://localhost:3000/api/libro/'+ params.id, form);
            props.history.push('/libros');
        } catch(e) {
            console.log(e.message);
        }
    }

    return (
        <div className="container">
            <div className="col-12">
                <div className="col-12 d-flex flex-direction-row justify-content-between align-items-center my-4">
                    <h2>Editar libro</h2>
                </div>
                <div className="col-8 mx-auto">
                    <div className=" m-4 p-3 bg-light">
                        <form className="row">
                            <div className="col-12">
                                <label htmlFor="input1" className="form-label mt-3">Nombre</label>
                                <input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre} id="input1" className="form-control"/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="input2" className="form-label mt-3">Descripción</label>
                                <input type="text" name="descripcion" placeholder="descripcion" value={form.descripcion} onChange={handleChangeDescripcion} id="input2" className="form-control"/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="input3" className="form-label mt-3">Categoría</label>
                                <select name="categoria_id" id="input3" onChange={handleChangeCategoria_id} className="form-select">
                                    <option selected>Seleccione una categoría</option>
                                    {categorias.map(unaCategoria => (
                                        <option value={unaCategoria.id}>
                                            {unaCategoria.nombre}
                                        </option>
                                    ))}
                                </select>                                                                
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
                            {/* <div className="col-12">
                                <label htmlFor="input3" className="form-label mt-3">Categoría</label>
                                <input type="text" name="categoria_id" placeholder="categoria_id" value={form.categoria_id} onChange={handleChangeCategoria_id} id="input1" className="form-control"/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="input4" className="form-label mt-3">ID de persona</label>
                                <input type="text" name="persona_id" placeholder="persona_id" value={form.persona_id} onChange={handleChangePersona_id} id="input1" className="form-control"/>
                            </div> */}
                        </form>
                        <button onClick={guardar} className="btn btn-primary mt-4">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )

}


            