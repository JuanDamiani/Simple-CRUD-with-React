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
        <div className="container">
            <div className="col-12">
                <div className="col-12 d-flex flex-direction-row justify-content-between align-items-center my-4">
                    <h2>Agregar nuevo libro</h2>
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
                                <label htmlFor="input3" className="form-label mt-3">ID categoría</label>
                                <input type= "text"  name="categoria_id" placeholder="categoria_id" value={form.categoria_id} onChange={handleChangeCategoria_id} id="input3" className="form-control"/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="input4" className="form-label mt-3">ID de persona</label>
                                <input type= "text"  name="persona_id" placeholder="persona_id" value={form.persona_id} onChange={handleChangePersona_id} id="input4" className="form-control"/>
                            </div>
                        </form>
                        <button onClick={guardar} className="btn btn-primary mt-4">Guardar</button>
                    </div>
                </div>
            </div>
        </div>    
    );

}