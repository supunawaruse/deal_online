import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { createProductReview, listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'



const ProductScreen = ({ history, match }) => {

    const [qty, setQty] = useState(1)

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { error: errorProductReview, success: successProductReview } = productReviewCreate

    useEffect(() => {



        if (successProductReview) {
            alert('Review Submitted')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])


    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <>
        <br />
        <br />
            {
                loading ? <Loader /> : error ?
                    <Message variant='danger'>{error}</Message> :
                    (
                        <>
                            <section id="productDetails" className="pb-5">
                                <div className="card">
                                    <div className="row mt-5 mb-5">
                                        <div className="col-lg-6 text-center" >
                                            <img src={product.image} alt="Third slide" className="img-fluid" />
                                        </div>

                                        <div className="col-lg-5 text-center text-md-left pl-5">

                                            <h2 className="h2-responsive text-center text-md-left font-weight-bold dark-grey-text">
                                                <strong>{product.name}</strong>
                                            </h2>

                                            <h3 className="h3-responsive text-center text-md-left">
                                                <span className="red-text font-weight-bold">
                                                    <strong>${product.price}</strong>
                                                </span>
                                            </h3>

                                            <h6 className="h6-responsive text-center text-md-left">
                                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                            </h6>

                                            <div className="accordion md-accordion">
                                                <div className="card">


                                                    <ListGroup variant='flush'>

                                                        <ListGroup.Item>
                                                            <Row>
                                                                <Col>
                                                                    Status:
                                                                </Col>
                                                                <Col>
                                                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                                </Col>

                                                            </Row>
                                                        </ListGroup.Item>
                                                        {product.countInStock > 0 && (
                                                            <ListGroup.Item>
                                                                <Row>
                                                                    <Col>Qty</Col>
                                                                    <Col>
                                                                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                            {
                                                                                [...Array(product.countInStock).keys()].map(x => (
                                                                                    <option key={x + 1} value={x + 1}>
                                                                                        {x + 1}
                                                                                    </option>
                                                                                ))
                                                                            }
                                                                        </Form.Control>
                                                                    </Col>

                                                                </Row>
                                                            </ListGroup.Item>
                                                        )}

                                                        <ListGroup.Item>
                                                            <Button onClick={addToCartHandler} className="btn-block" type="button" disabled={product.countInStock === 0}>
                                                                Add to Cart
                                                            </Button>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='row' style={{padding:20}}>
                                    <div className='col-12'>
                                            
                                                     <div className="card-header">
                                                        <h5 className="mb-0">Description</h5>
                                                    </div>
                                                    <div className="card-body">{product.description}</div> 
                                    </div>
                                </div>
                                </div>
                          
                            </section>

                            <div className="divider-new" style={{ margin: 10 }}>
                                <h3 className="h3-responsive font-weight-bold blue-text">Product Reviews</h3>
                            </div>




                            <section id="reviews">
                                {product.reviews.length === 0 && <Message>No Reviews</Message>}


                                {product.reviews.map(review => (

                                    
                            <div  key={review._id} class="card mb-2">
 
                            <div class="card-body">
                              <blockquote class="blockquote mb-0">
                              <h6><Rating value={review.rating} /></h6>
                                <p style={{padding:0,margin:0,fontSize:16}}>{review.comment}</p>
                                
                                <footer class="blockquote-footer"><cite title="Source Title">{review.name}</cite></footer>
                                <footer class="blockquote-footer"><cite title="Source Title">{review.createdAt.substring(0, 10)}</cite></footer>
                              </blockquote>
                            </div>
                          </div>
                                ))}
                            </section>
                            <Row>
                                <Col md={6}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h2>Write a Customer Review</h2>
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                            <option value='' >Select...</option>
                                                            <option value='1' >1 - Poor</option>
                                                            <option value='2' >2 - Fair</option>
                                                            <option value='3' >3 - Good</option>
                                                            <option value='4' >4 - Very Good</option>
                                                            <option value='5' >5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Comment</Form.Label>
                                                        <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Button type='submit' variant='primary'>Submit</Button>
                                                </Form>
                                            ) : <Message>Please  <Link to='/login'>sign in</Link>to write a review {' '}</Message>}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        <br />
                        <br />
                        <br />
                        </>
                    )
            }

        </>
    )
}

export default ProductScreen
