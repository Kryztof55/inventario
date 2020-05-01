import React from 'react'
import Button from '../../atomos/boton/boton'
import Moment from 'react-moment'
import style from './style.scss'

const Card = props => {
    const {image, record, band, genre, released, edicion, price, action, actionEdit } = props
    return (
            <div className="card" >
                <img className="card-img-top" src={image} alt={record}/>
                <div className="card-body">
                    <h5 className="card-title">{record}</h5>
                    <p className="card-text">{band}</p>
                    <p className="card-text">{genre}</p>
                    <ul className="list-group list-group-flush mb-3">
                        <li className="list-group-item">Lanzamiento:
                            <Moment format="YYYY/MM/DD">
                                {released}
                            </Moment>
                         </li>
                        <li className="list-group-item">{edicion}</li>
                        <li className="list-group-item">${price}</li>
                    </ul>
                    <Button typeButton="button" className="btn btn-info mr-2" action={actionEdit}>
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