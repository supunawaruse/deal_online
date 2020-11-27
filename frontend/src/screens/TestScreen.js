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



const TestScreen = ({ history, match }) => {

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

{/* <div class="col-lg-3">

  <div class="">

    <div class="row">


      <div class="col-md-6 col-lg-12 mb-5">

        <h5 class="font-weight-bold dark-grey-text"><strong>Price</strong></h5>

        <div class="divider"></div>

        <form class="range-field mt-3">

          <input id="calculatorSlider" class="no-border" type="range" value="0" min="0" max="30" />

        </form>


        <div class="row justify-content-center">


          <div class="col-md-6 text-left">

            <p class="dark-grey-text"><strong id="resellerEarnings">0$</strong></p>

          </div>

          <div class="col-md-6 text-right">

            <p class="dark-grey-text"><strong id="clientPrice">319$</strong></p>

          </div>


        </div>


      </div>

      <div class="col-md-6 col-lg-12 mb-5">

        <h5 class="font-weight-bold dark-grey-text"><strong>Rating</strong></h5>

        <div class="divider"></div>

        <div class="row ml-1">


          <ul class="rating mb-0">

            <li><i class="fas fa-star blue-text"></i></li>

            <li><i class="fas fa-star blue-text"></i></li>

            <li><i class="fas fa-star blue-text"></i></li>

            <li><i class="fas fa-star blue-text"></i></li>

            <li><i class="fas fa-star blue-text"></i></li>

            <li>

              <p class="ml-3 dark-grey-text"><a>4 and more</a></p>

            </li>

          </ul>

        </div>

        <div class="row ml-1">


          <ul class="rating mb-0">

            <li><i class="fas fa-star blue-text"></i></li>

            <li><i class="fas fa-star blue-text"></i></li>

            <li><i class="fas fa-star blue-text"></i></li>

            <li><i class="fas fa-star blue-text"></i></li>

            <li><i class="fas fa-star grey-text"></i></li>

            <li>

              <p class="ml-3 dark-grey-text"><a>3 - 3,99</a></p>

            </li>

          </ul>

        </div>

        <div class="row ml-1">


          <ul class="rating">

            <li><i class="fas fa-star blue-text"></i></li>

            <li><i class="fas fa-star blue-text"></i></li>

            <li><i class="fas fa-star blue-text"></i></li>

            <li><i class="fas fa-star grey-text"></i></li>

            <li><i class="fas fa-star grey-text"></i></li>

            <li>

              <p class="ml-3 dark-grey-text"><a>3.00 and less</a></p>

            </li>

          </ul>

        </div>

      </div>


    </div>


  </div>

</div> */}





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

export default TestScreen
