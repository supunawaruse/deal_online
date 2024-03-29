import React, { useState,useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    useEffect(()=>{
        if (!userInfo) {
            history.push('/login')
        }

    },[userInfo])

    return (
        <FormContainer>

            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Row>
                <Col style={{padding:20,backgroundColor:'white',borderRadius:10}}>
                    <Form onSubmit={submitHandler}  >

                        <Form.Group controlId='address'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type='text' placeholder='Enter address' value={address} onChange={(e) => setAddress(e.target.value)} ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control type='text' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='postalCode'>
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control type='text' placeholder='Enter postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='country'>
                            <Form.Label>Country</Form.Label>
                            <Form.Control type='text' placeholder='Enter Country' value={country} onChange={(e) => setCountry(e.target.value)} ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>Continue</Button>

                    </Form>
                </Col>

            </Row>

        </FormContainer>
    )
}

export default ShippingScreen
