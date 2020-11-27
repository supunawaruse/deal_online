import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductsByCategory } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'



const CategoryScreen = ({ history, match }) => {

  const category = match.params.category
  const pageNumber = match.params.pageNumber || 1
  
  const dispatch = useDispatch()
  const productListByCategory = useSelector(state => state.productListByCategory)
  const { loading, error, productsByCategory,page,pages } = productListByCategory

  useEffect(() => {
  
    dispatch(listProductsByCategory(category,pageNumber))

  }, [dispatch, category,pageNumber])


  return (


    <>

      {
        loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (<>
          <br />
          <h2>{category && category.toUpperCase()}</h2>
          <hr />

          
      <div className="row">

<div class="col-12">

  <section class="section pt-4">

    <div class="row mb-3">
    {
      productsByCategory.map(product => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      ))
    }
        


    </div>
    <Paginate pages={pages} page={page} category={category ? category : ''} />
  </section>

</div>



</div>





          <br />
          <br />
        </>
            )

      }


               




    </>
  )
}

export default CategoryScreen
