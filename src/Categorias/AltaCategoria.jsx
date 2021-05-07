import React from 'react';
import axios from 'axios';

export default function AltaCategiria(props) {
    const [form, setForm] = React.useState({
        nombre: '',
    });

    const handleChangeNombre = e => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    };

    const guardar = async () => {
        // form
        await axios.post('localhost:3000/api/categiria', form);
        props.history.push('/categoria');
    };

    return (
        <div>
            <input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre} />
            
            <br />
            <button onClick={guardar}>Guardar</button>
        </div>
    );
}
