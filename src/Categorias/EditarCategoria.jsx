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
            const respuesta = await axios.get('http://localhost:3000/api/persona/'+idCategoria.toString());
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
        <div>
            <input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre}/><br/>
            <button onClick={guardar}>Guardar</button>
        </div>
    )
}
