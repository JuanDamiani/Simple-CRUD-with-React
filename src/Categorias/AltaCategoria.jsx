import React from 'react';
import axios from 'axios';

export default function AltaCategoria(props) {
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
        try {
        await axios.post('http://localhost:3000/api/categoria', form);
        props.history.push('/categorias');
        }
        catch(e){
            console.log(e.response.data);  
            
        }
    };

    return (
        <div>
            <input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre} />
            
            <br />
            <button onClick={guardar}>Guardar</button>
        </div>
    );
}
