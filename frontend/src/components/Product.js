import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'

const Product = ({ product }) => {
    return (
<div class="card booking-card mt-4">


<div class="view">
<Link to={`/product/${product._id}`}>
  <img class="card-img-top" src={product.image} alt="Card image cap" style={{objectFit:'cover',height:200}} />
  </Link>
</div>


<div class="card-body" style={{minHeight:230,maxHeight:230}}>

<Link to={`/product/${product._id}`}>
    <h4 class="card-title font-weight-bold" style={{color:'black'}} ><a>{product.name}</a></h4>
</Link>
    <h6><Rating value={product.rating} text={`${product.numReviews} reviews` } /></h6>
    <p class="mb-2 font-weight-bold">${product.price}</p>
 
    <p class="card-text">{product.description.substring(0, 20)}<Link to={`/product/${product._id}`}>...more</Link></p>
</div>

</div>
    )
}

export default Product
