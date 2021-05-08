import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditarPersona(props) {
   const params = useParams();
    const [form, setForm] = React.useState({
        nombre: '',
        apellido: '',
        alias:'',
        // email:''
    })

    //then((response) => setForm({nombre: response.data.nombre, apellido: response.data.apellido, alias: response.data.alias}))

    const buscarPersonaPorId = async(idPersona) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/persona/'+idPersona).
            then((response) => setForm({nombre: response.data.nombre, apellido: response.data.apellido, alias: response.data.alias}))
        } catch(e) {
        console.log(e.message);
        }
    }

    React.useEffect(() => {
        if (!params.id) return;
        buscarPersonaPorId(params.id)
    }, [params])

    const handleChangeNombre = (e) => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeApellido = (e) => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.apellido = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeAlias = (e) => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.alias = e.target.value;
        setForm(nuevoState);
    }
    
    // const handleChangeEmail = (e) => {
    //     // e.target.value
    //     const nuevoState = JSON.parse(JSON.stringify(form));
    //     nuevoState.email = e.target.value;
    //     setForm(nuevoState);
    // }

    const guardar = async() => {
        // form
         try{
        await axios.put('http://localhost:3000/api/persona/'+ params.id, form);
        props.history.push('/personas');
         }
         catch(e) {
          console.log(e.message);
         }
    }


    return (
        <div>
            <input type="text" name="nombre" placeholder="nombre" value={form.nombre} onChange={handleChangeNombre}/><br/>
            <input type="text" name="apellido" placeholder="apellido" value={form.apellido} onChange={handleChangeApellido}/><br/>
            <input type="text" name="alias" placeholder="alias" value={form.alias} onChange={handleChangeAlias}/><br/>
            {/* <input type="text" name="email" placeholder="email" value={form.email} onChange={handleChangeEmail}/><br/> */}
            <button onClick={guardar}>Guardar</button>
        </div>
    )
}
