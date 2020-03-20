import React from 'react'
import Button from '../../atomos/boton/boton'
import style from './style.scss'

const Card = props => {
    const {urlImg, record, band, genre, released, edicion, price, action } = props
    return (
            <div className="card" >
                <img className="card-img-top" src={urlImg} alt={record}/>
                <div className="card-body">
                    <h5 className="card-title">{record}</h5>
                    <p className="card-text">{band}</p>
                    <p className="card-text">{genre}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Lanzamiento: {released}</li>
                    <li className="list-group-item">{edicion}</li>
                    <li className="list-group-item">${price}</li>
                </ul>
                <div className="card-body">
                    <Button typeButton="button" className="btn btn-info mr-2">
                        <i className="material-icons">create</i>
                    </Button>
                    <Button typeButton="button" className="btn btn-danger" action={action}>
                        <i className="material-icons">delete</i>
                    </Button>
                </div>
            </div>
        
        
    )
}
export default Card