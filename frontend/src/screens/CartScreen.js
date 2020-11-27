import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'


const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart


    useEffect(() => {

        if (productId) {
            dispatch(addToCart(productId, qty))
        }

    }, [dispatch, productId, qty])

    const removeFormCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go back</Link></Message> : (

                <section className="section pb-5">
                    <div className="table-responsive">
                        <table className="table product-table table-cart-v-1 " style={{ backgroundColor: 'white', borderRadius: 10 }}>
                            <thead>

                                <tr>
                                    <th></th>
                                    <th className="font-weight-bold"><strong>Product</strong></th>
                                    <th className="font-weight-bold"><strong>Price</strong></th>
                                    <th className="font-weight-bold"><strong>QTY</strong></th>
                                    <th className="font-weight-bold"><strong>Amount</strong></th>
                                    <th></th>
                                </tr>

                            </thead>

                            <tbody>

                                {cartItems.map(item => (
                                    <tr key={item.product}>
                                        <th scope="row">
                                            <img src={item.image} alt={item.name}
                                                className="img-fluid z-depth-0" />
                                        </th>

                                        <td>
                                            <h6 className="mt-3 font-weight-bold">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </h6>
                                        </td>


                                        <td>${item.price}</td>
                                        <td className="text-center text-md-left">
                                            <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </td>

                                        <td className="font-weight-bold">
                                            <strong>${item.price * item.qty}</strong>
                                        </td>

                                        <td>
                                            <Button type='button' className='btn-danger btn-rounded' onClick={() => removeFormCartHandler(item.product)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>

                                    </tr>
                                ))}

                                <tr>

                                    <td colspan="3"></td>
                                    <td>
                                        <h4 className="mt-2"><strong>Total</strong></h4>
                                    </td>

                                    <td className="text-right">
                                        <h4 className="mt-2">
                                            <strong>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</strong>
                                        </h4>
                                    </td>

                                    <td colspan="3" className="text-right">
                                        <Button type='button' className='btn btn-primary btn-rounded' disabled={cartItems.length === 0} onClick={checkOutHandler}>purchase
                                            <i className="fas fa-angle-right right"></i>
                                        </Button>
                                    </td>

                                </tr>

                            </tbody>
                        </table>
                    </div>
                </section>

            )}
        </>

    )
}

export default CartScreen
