import React from 'react';
import axios from 'axios';

export default function AltaLibro(props) {
    const [form, setForm] = React.useState(
        {nombre:"", 
        descripcion:"", 
        categoria_id: 0, 
        persona_id: 0
    } );

    const handleChangeNombre = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    };

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
    };
  
   /* const guardar = async () => {
        // form
        try {
        await axios.post('http://localhost:3000/api/libro', form);
        props.history.push('/libros');}
        catch(e) {
            console.log(e);
        }
        */
        const guardar = async () => {
            // form
            try {
            await axios.post('http://localhost:3000/api/libro', form);
            props.history.push('/libros');}
            catch(e) {
                console.log(e.message);
                alert( "Es posible que no exista esa persona y/o esa categoria.");
                props.history.push('/libros');
            }

    }


    return (
        <div>
            <input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre} />
            <input type="text" name="descripcion" placeholder="descripcion" value={form.descripcion} onChange={handleChangeDescripcion}/><br/>
            <input type= "number"  name="categoria_id" placeholder="categoria_id" value={form.categoria_id} onChange={handleChangeCategoria_id}/><br/>
            <input type= "number"  name="persona_id" placeholder="persona_id" value={form.persona_id} onChange={handleChangePersona_id}/><br/>
            <br />
           
            <br />
            <button onClick={guardar}>Guardar</button>
        </div>
    );



}
