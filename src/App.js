import React, {useState, useEffect} from 'react';



import Jumbotron from './components/atomos/jumbotron/jumbotron'
import Button from './components/atomos/boton/boton'
import Input from './components/atomos/input/input'
import Modal from './components/organismos/modal/modal'
import Alert from './components/moleculas/alert/alert'
import Card from './components/organismos/cards/card'
const App = () => {
  const [show, setShow] = useState(false);
  const [recordName, setRecordName]= useState();
  const [band, setBand]= useState();
  const [genre, setGenre]= useState();
  const [description, setDescription]= useState();
  const [released, setReleased]= useState();
  const [edicion, setEdicion]= useState();
  const [price, setPrice]= useState();
  const [image, setImage] = useState("Defaul");
  const [resAdd, setResAdd] = useState(false);
  const [resMessage, setResMessage]= useState("Mensaje");
  const [resTheme, setResTheme] = useState("alert alert-success");
  const [records, setRecords] = useState([]);
  const [filtrando, setFiltrando] = useState(false)
  const [recordFiltrado, setRecordFiltrado] = useState([])
  useEffect(() => {
    peticionRecord()
    console.log(records)
  },[]);

  // content cards

  

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

  const onChangeUpload = e =>{
    console.log(e.target.files[0])
    let file = e.target.files[0]
    let reader = new FileReader();
    reader.onload = function(){
      setImage(reader.result)
    };
    reader.readAsDataURL(file);
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
        "price": price,
        "image":image,
      }
      console.log(record)
      fetch("http://localhost:5000/records/add", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(record)
        }
      )
      .then(res =>{
        console.log(res.json())
        setResAdd(true)
        setResMessage("Record added succesfully")
        peticionRecord()
        setTimeout(() => {
          closeModal()
          form.reset()
          setResAdd(false)
        }, 1000)
        
        
      } )
      .catch(error =>{
        console.log('Error:', error.json())
        setResAdd(true)
        setResMessage("Error")
        setResTheme("alert alert-danger")

      } 
      )
    }
  }
  const peticionRecord = () => {
    fetch("http://localhost:5000/records", {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
          }
    ).then(res =>{
        return (res.json())
        } 
      )
      .then(res =>{
          setRecords(res)
          setFiltrando(false);
          console.log(res)
          //console.log(records)
        }
      )
      .catch(error =>{
        console.log('Error:', error)
        console.log("Falla")
      } 
    )
  }
  const deleteRecord = (item) =>{
    fetch(`http://localhost:5000/records/${item}`, {
          method: "DELETE",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
          }
    ).then(res =>{
        peticionRecord()
        } 
      )
      .catch(error =>{
        console.log('Error:', error)
        console.log("Falla")
      } 
    )
  }
  const edit = () =>{
    console.log("edit")
  }
  const filtrarRecord = (e) => {
    //console.log(e.target.value)
    var textFilter = e.target.value.toLowerCase()
    setFiltrando(true);
    var recordFilter = records.filter(records => 
                       records.recordname.toLowerCase().includes(textFilter) || 
                       records.band.toLowerCase().includes(textFilter) ||
                       records.description.toLowerCase().includes(textFilter) ||
                       records.genre.toLowerCase().includes(textFilter) 

    
    )
    setRecordFiltrado(recordFilter)
  }
  let cardRecords = !filtrando? records : recordFiltrado
  return (
    <div className="App">
      <Jumbotron className="jumbotron jumbotron-fluid">
        <h1 className="display-4">kryztof's Records</h1>
        <p className="lead">Inventario de Discos de vinyl</p>
        <Input inputType="search" className="form-control" placeholder="Buscar..." required={false} onChange={filtrarRecord}/>
      </Jumbotron>
      <section className="container mb-5">
          <div className="d-flex">
            <Button typeButton="button" className="btn btn-primary d-flex align-items-center" text="Add" action={openModal}>
              <i className="material-icons">add</i>
            </Button>

          </div>
      </section>
      <section className="container mb-5">
        <div className="grid-cards">
          {
          cardRecords.map(item => (
              <Card key={item._id} image={item.image} record={item.recordname} band={item.band} genre={item.genre} released={item.released} edicion={item.edition} price={item.price} actionEdit={edit} action={() => deleteRecord (item._id)}/>
            ))
          }
        </div>
      </section>

      <Modal closeModal={closeModal} show={show} header="Agregar disco">
        <form className="mb-3" id="addForm" encType="multipart/form-data">
          <Input inputType="text" className="form-control mb-2" placeholder="Nombre del disco" required={true} onChange={onChangeName}/>
          <Input inputType="text" className="form-control mb-2" placeholder="Banda" required={true} onChange={onChangeBanda}/>
          <Input inputType="text" className="form-control mb-2" placeholder="Género" required={true} onChange={onChangeGenre}/>
          <Input inputType="text" className="form-control mb-2" placeholder="Descripción" required={true} onChange={onChangeDescripcion}/>
          <Input inputType="date" className="form-control mb-2" placeholder="Lanzamiento" required={true} onChange={onChangeReleased}/>
          <Input inputType="text" className="form-control mb-2" placeholder="Edición" required={true} onChange={onChangeEdicion}/>
          <Input inputType="number" className="form-control mb-2" placeholder="Precio" required={true} onChange={onChangePrecio}/>
          <Input inputType="file" className="form-control mb-2" placeholder="Upload image" required={true} onChange={onChangeUpload}></Input>
          <Button typeButton="submit" className="btn btn-primary d-flex align-items-center" text="Guardar" action={enviar} disabled={false}></Button>
        </form>
        {

          resAdd?
            <div className="container">
              <Alert theme={resTheme} text={resMessage}></Alert>
            </div>
          :
          <div></div>
        }
      </Modal>
    </div>
  );
}

export default App;