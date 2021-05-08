import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditarLibro(props) {
   const params = useParams();
    const [form, setForm] = React.useState({
        nombre:"", 
        descripcion:"", 
        categoria_id:"", 
        persona_id:""
    })

    const buscarLibroPorId = async(idLibro) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/libro/'+idLibro);
            setForm(respuesta.data);
        } catch(e) {
            console.log(e);

        }
    }

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
    const guardar = async() => {
        // form 
        await axios.put('http:/localhost:3000/api/libro/'+params.id, form);
        props.history.push('/libros');
    }


    return (
        <div>
                             
            <label>Nombre </label>
              <input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre} /> <br/>
            <label>Descripcion </label>   
               <input type="text" name="descripcion" placeholder="descripcion" value={form.descripcion} onChange={handleChangeDescripcion}/><br/>
            <label>Categoria Id  </label>
                <input type="text" name="categoria_id" placeholder="categoria_id" value={form.categoria_id} onChange={handleChangeCategoria_id}/><br/>
            <label>Persona Id </label>
                <input type="text" name="persona_id" placeholder="persona_id" value={form.persona_id} onChange={handleChangePersona_id}/><br/>
            <button onClick={guardar}>Guardar</button>
       </div>
        
    )
}
