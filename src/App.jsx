import { nanoid } from "nanoid";
import { useState } from "react";

function App() {

  const [tarea, setTarea] = useState('')
  const [tareas, setTareas] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [idTarea, setIdTarea] = useState('')
  const [error, setError] = useState(null)

  const agregarTarea = (e) => {
    e.preventDefault()
    if(!tarea.trim()) {
      console.log("elemento vacío")
      setError('Escriba algo por favor...')
      return
    }
    setTareas([
      ...tareas, { id: nanoid(), descripcion: tarea }
    ])
    setTarea('')
    setError(null)
  }

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter( item => item.id !== id )
    setTareas(arrayFiltrado)
  }

  const editar = item => {
    console.log(item)
    setModoEdicion(true)
    setIdTarea(item.id)
    setTarea(item.descripcion)
  }

  const editarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()) {
      console.log("elemento vacío")
      setError('Escriba algo por favor...')
      return
    }
    const newLista = tareas.map(item => item.id === idTarea ? { id: idTarea, descripcion: tarea } : item)
    setTareas(newLista)
    setModoEdicion(false)
    setTarea('')
    setIdTarea('')
    setError(null)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
              {
                tareas.length > 0 ?
                tareas.map((item) => (
                  <li className="list-group-item" key={item.id}>
                    <span className="lead">{item.descripcion}</span>
                    <button
                      onClick={ () => eliminarTarea(item.id) } 
                      className="btn btn-danger btn-sm float-right mx-2">Eliminar</button>
                    <button
                      onClick={ () => editar(item) }
                      className="btn btn-warning btn-sm float-right">Editar</button>
                  </li>
                )) : 
                <li className="list-group-item">
                  <span className="lead">Lista vacía</span>
                </li>
              }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar tarea' : 'Agregar tarea'
            }
          </h4>
          <form onSubmit={ modoEdicion ? editarTarea : agregarTarea }>

            {
              error ? <span className="text-danger">{error}</span> : ''
            }

            <input 
              type="text" 
              className="text form-control mb-2" 
              placeholder="Ingrese Tarea"
              onChange={ e => setTarea(e.target.value) }
              value={ tarea }
            />
            {
                modoEdicion ? (
                  <button className="btn btn-warning btn-block" type="submit">Editar</button>
                ) : (<button className="btn btn-dark btn-block" type="submit">Agregar</button>)
            }
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
