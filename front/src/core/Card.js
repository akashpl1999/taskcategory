import  React from "react"
import {Link} from "react-router-dom"
import Showimage from './Showimage'

const Card=({product})=>{
    console.log(product)
    return(
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header">
                    {product.name}
                
                </div>

                <div className="card-body">
                    <Showimage item={product} url='product'/>
                    <p>{product.description}  </p>
                    <p>{product.price}  </p>
                 <Link to="/">
                     <button className="btn btn-outline-primary mt-2 mb-2">
                         view Product
                     </button>
                 </Link>

                 <button className="btn btn-outline-secondary mt-2 mb-2">
                         Add to Card
                     </button>
                
              
              
                </div>
            
            
            </div>
        </div>

    )
}

export default Card;