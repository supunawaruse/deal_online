import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'

const ProfileScreen = ({ history, location }) => {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile


    useEffect(() => {
        dispatch({type:USER_UPDATE_PROFILE_RESET})
        dispatch(listMyOrders())
        setMessage('')

        if (!userInfo) {
            history.push('/login')
        } else {
               
                dispatch(getUserDetails('profile'))
                setName(user.name)
                setEmail(user.email)
            
        }
    }, [dispatch, history, userInfo,user.name,user.email])





    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
            dispatch(getUserDetails('profile'))
            
        }
    }


    return (
        <Row>
            <Col md={3}>
                <h2>Sign Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {userUpdateProfile.loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>

                {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th className='text-center'>ID</th>
                                <th className='text-center'>DATE</th>
                                <th className='text-center'>TOTAL</th>
                                <th className='text-center'>PAID</th>
                                <th className='text-center'>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td className='text-center'>{order._id}</td>
                                    <td className='text-center'>{order.createdAt.substring(0, 10)}</td>
                                    <td className='text-center'>{order.totalPrice}</td>
                                    <td className='text-center'>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}</td>
                                    <td className='text-center'>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}</td>
                                    <td className='text-center'>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>

    )
}

export default ProfileScreen
