import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditarCategoria(props) {
   const params = useParams();
    const [form, setForm] = React.useState({
        nombre: '',
    })

    const buscarCategoriaPorId = async(idCategoria) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/categoria/'+idCategoria);
            setForm(respuesta.data);
        } catch(e) {
            console.log(e.message);
        }
    }

    React.useEffect(() => {
        if (!params.id) return;
        buscarCategoriaPorId(params.id);
    }, [params])

    const handleChangeNombre = (e) => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    const guardar = async() => {
        // form 
        await axios.put('http://localhost:3000/api/categoria/'+params.id, form);
        props.history.push('/categorias');
    }


    return (
        <div className="container">
            <div className="col-12">
                <div className="col-12 d-flex flex-direction-row justify-content-between align-items-center my-4">
                    <h2>Editar categoría</h2>
                </div>
                <div className="col-8 mx-auto">
                    <div className=" m-4 p-3 bg-light">
                        <form className="row">
                            <div className="col-12">
                                <label htmlFor="input1" className="form-label mt-3">Nombre de categoría</label>                                
                                <input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre} id="input1" className="form-control"/>
                            </div>
                        </form>                        
                        <button onClick={guardar} className="btn btn-primary mt-4">Guardar</button>
                    </div>
                </div>
            </div> 
        </div>
    )
}



