import React from 'react';
import axios from 'axios';

export default function AltaPersona(props) {
    const [form, setForm] = React.useState({
        nombre: '',
        apellido: '',
        alias: '',
        email: '',
    });

    const handleChangeNombre = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    };

    const handleChangeApellido = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.apellido = e.target.value;
        setForm(nuevoState);
    };

    const handleChangeAlias = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.alias = e.target.value;
        setForm(nuevoState);
    };

    const handleChangeEmail = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.email = e.target.value;
        setForm(nuevoState);
    };
    const guardar = async () => {
        // form
        try {
        await axios.post('http://localhost:3000/api/persona', form);
        props.history.push('/personas');}
        catch(e) {
            console.log(e);
        }
     };

    return (
        <div>
            <input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre} />
            <input type="text" name="apellido" placeholder="apellido" value={form.apellido} onChange={handleChangeApellido}/><br/>
            <input type="text" name="alias" placeholder="alias" value={form.alias} onChange={handleChangeAlias}/><br/>
            <input type="text" name="email" placeholder="email" value={form.email} onChange={handleChangeEmail}/><br/>
            <br />
            
            <br />
            <button onClick={guardar}>Guardar</button>
        </div>
    );



}
