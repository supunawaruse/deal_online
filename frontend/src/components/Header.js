import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import {resetCart} from '../actions/cartActions'
import SearchBox from './SearchBox'
import {Route} from 'react-router-dom'

const Header = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    const logoutHandler = async() => {
        dispatch(logout())
        dispatch(resetCart())
        history.replace('/login')

      
    }

    return (
        <header>
            <Navbar  variant='dark' expand="lg" collapseOnSelect style={{backgroundColor:'#323741'}}>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Daily_Deals</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({history})=> <SearchBox history={history}/>}/>
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={'settings'} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
                                    </LinkContainer>
                                )}

                            {userInfo && userInfo.data.isAdmin && (
                                 <NavDropdown title='Admin' id='adminmenu'>
                                 <LinkContainer to='/admin/userlist'>
                                     <NavDropdown.Item>Users</NavDropdown.Item>
                                 </LinkContainer>
                                 <LinkContainer to='/admin/productlist'>
                                     <NavDropdown.Item>Products</NavDropdown.Item>
                                 </LinkContainer>
                                 <LinkContainer to='/admin/orderlist'>
                                     <NavDropdown.Item>Orders</NavDropdown.Item>
                                 </LinkContainer>
                             </NavDropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>
        </header>
    )
}

export default Header
