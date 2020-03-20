import React, {useState} from 'react';

import Jumbotron from './components/atomos/jumbotron/jumbotron'
import Button from './components/atomos/boton/boton'
import Input from './components/atomos/input/input'
import Modal from './components/organismos/modal/modal'
const App = () => {
  const [show, setShow] = useState(false);
  
  const [recordName, setRecordName]= useState();
  const [band, setBand]= useState();
  const [genre, setGenre]= useState();
  const [description, setDescription]= useState();
  const [released, setReleased]= useState();
  const [edicion, setEdicion]= useState();
  const [price, setPrice]= useState();

  const onChangeName = (e) => {
    setRecordName(e.target.value)
    console.log(recordName)
  }
  const onChangeBanda = (e) => {
    setBand(e.target.value)
    console.log(band)
  }
  const onChangeGenre = (e) => {
    setGenre(e.target.value)
    console.log(genre)
  }
  const onChangeDescripcion = (e) => {
    setDescription(e.target.value)
    console.log(description)
  }
  const onChangeReleased = (e) => {
    setReleased(e.target.value)
    console.log(released)
  }
  const onChangeEdicion = (e) => {
    setEdicion(e.target.value)
    console.log(edicion)
  }
  const onChangePrecio = (e) => {
    setPrice(e.target.value)
    console.log(price)
  }


  const openModal = () => {
    setShow(true);
  }
  const closeModal = () => setShow(false);
  const enviar = (e) => {
    e.preventDefault()
    console.log("Se envía")
    let form = document.getElementById("addForm")
    
    if(recordName == undefined || band == undefined || genre == undefined || description == undefined || released == undefined || edicion == undefined || price == undefined){
      form.classList.add("was-validated")
    }
    else{
      const record = {
        "recordname": recordName,
        "band": band,
        "genre": genre,
        "description": description,
        "released": released,
        "edition": edicion,
        "price": price
      }
      console.log(record)
      fetch("http://localhost:5000/records/add", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
        }
      )
      .then(res =>{
        console.log(res.json())
      } )
      .catch(error => console.log('Error:', error))
    }
      
    
    
  }
  return (
    <div className="App">
      <Jumbotron className="jumbotron jumbotron-fluid">
        <h1 className="display-4">kryztof's Records</h1>
        <p className="lead">Inventario de Discos de vinyl</p>
        
      </Jumbotron>
      <section className="container">
          <div className="d-flex">
            <Button typeButton="button" className="btn btn-primary d-flex align-items-center" text="Add" action={openModal}>
              <i className="material-icons">add</i>
            </Button>

          </div>
      </section>
      <Modal closeModal={closeModal} show={show} header="Agregar disco">
        <form className="container" id="addForm">
          <Input value={recordName} inputType="text" className="form-control mb-2" placeholder="Nombre del disco" required={true} onChange={onChangeName}/>
          <Input value={band} inputType="text" className="form-control mb-2" placeholder="Banda" required={true} onChange={onChangeBanda}/>
          <Input value={genre} inputType="text" className="form-control mb-2" placeholder="Género" required={true} onChange={onChangeGenre}/>
          <Input value={description} inputType="text" className="form-control mb-2" placeholder="Descripción" required={true} onChange={onChangeDescripcion}/>
          <Input value={released} inputType="date" className="form-control mb-2" placeholder="Lanzamiento" required={true} onChange={onChangeReleased}/>
          <Input value={edicion} inputType="text" className="form-control mb-2" placeholder="Edición" required={true} onChange={onChangeEdicion}/>
          <Input value={price} inputType="number" className="form-control mb-2" placeholder="Precio" required={true} onChange={onChangePrecio}/>
          <Button  typeButton="submit" className="btn btn-primary d-flex align-items-center" text="Guardar" action={enviar} disabled={false}></Button>
        </form>
      </Modal>
    </div>
  );
}

export default App;
