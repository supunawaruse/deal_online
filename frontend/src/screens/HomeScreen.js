import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProducts} from '../actions/productActions'


const HomeScreen = ({match}) => {

    const keyword = match.params.keyword

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading,error,products} = productList

    useEffect(()=>{

        dispatch(listProducts(keyword))
       
        
    },[dispatch,keyword])

    return (
        <>
            {
                loading ? (
                   <Loader />
                ) : error ? (
                <Message variant='danger'>{error}</Message>
                ):(

                    <>
                    <div id="carousel-example-1z" className="carousel slide carousel-fade" data-ride="carousel">
              
              
                      <ol className="carousel-indicators">
              
                        <li data-target="#carousel-example-1z" data-slide-to="0" className="active"></li>
              
                        <li data-target="#carousel-example-1z" data-slide-to="1"></li>

              
                      </ol>
              
                      <div className="carousel-inner" role="listbox">


                      <div className="carousel-item active">
              
              <div className="view h-100">
  
                <img className="d-block h-100 w-lg-100" src="https://mdbootstrap.com/img/Photos/Others/ecommerce3.jpg"
                  alt="Third slide" />
  
                <div className="mask">
  
  
                  <div className="full-bg-img flex-center white-text">
  
                    <ul className="animated fadeIn col-md-10 text-center text-md-right list-unstyled">
  
                      <li>
  
                        <p className="h1 white-text mb-4 mt-5">
  
                          <strong>Sale off 20% on every headphones!</strong>
  
                        </p>
  
                      </li>
  
                      <li>
  
                        <h5 className="h5-responsive dark-grey-text font-weight-bold mb-5 pr-lg-5">Tempora incidunt ut labore et
  
                        dolore veritatis et quasi</h5>
  
                      </li>
  
                    </ul>
  
                  </div>
  
                </div>
  
              </div>
  
            </div>
              
              
                        <div className="carousel-item ">
              
                          <div className="view h-100">
              
                            <img className="d-block h-100 w-lg-100" src="https://mdbootstrap.com/img/Photos/Others/ecommerce3.jpg"
                              alt="First slide" />
              
                            <div className="mask">
              
              
                              <div className="full-bg-img flex-center white-text">
              
                                <ul className="animated fadeIn col-10 list-unstyled">
              
                                  <li>
              
                                    <p className="h1 red-text mb-4 mt-5">
              
                                      <strong>Sale off 30% on every saturday!</strong>
              
                                    </p>
              
                                  </li>
              
                                  <li>
              
                                    <h5 className="h5-responsive dark-grey-text font-weight-bold mb-5">Tempora incidunt ut labore et dolore
              
                                    veritatis et quasi architecto beatae</h5>
              
                                  </li>
              
                                  <li>
              

              
                                  </li>
              
                                </ul>
              
                              </div>
              
              
                            </div>
              
                          </div>
              
                        </div>
              

              
           
              
                      </div>
              
                      <Link className="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
              
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              
                        <span className="sr-only">Previous</span>
              
                      </Link>
              
                      <Link className="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
              
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
              
                        <span className="sr-only">Next</span>
              
                      </Link>
              
              
                    </div>
              
              
              
                    <div className='container-fluid' style={{ backgroundColor: '#323741' }}>
                      <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#323741' }}>
              
                          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1"
                            aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation"><span
                              className="navbar-toggler-icon"></span></button>
              
              
                          <div className="collapse navbar-collapse" id="navbarSupportedContent1">
                            <ul className="navbar-nav mr-auto">
                              <li className="nav-item dropdown mega-dropdown">
                                <Link className="nav-link dropdown-toggle no-caret" id="navbarDropdownMenuLink1" data-toggle="dropdown"
                                  aria-haspopup="true" aria-expanded="false">Categories</Link>
              
                                <div className="dropdown-menu mega-menu v-2 row z-depth-1 white" aria-labelledby="navbarDropdownMenuLink1">
                                  <div className="row mx-md-4 mx-1">
              
                                    <ul className="caret-style pl-0">
                                      <li className=""> <Link to={`/category/electronics`}>Electronics
                                                    </Link></li>
                                                    <li className=""> <Link to={`/category/fashion`}>Fashion
                                                    </Link></li>
                                                    <li className=""> <Link to={`/category/home_and_garden`}>Home and Garden
                                                    </Link></li>
                                                    <li className=""> <Link to={`/category/sporting_goods`}>Sporting Goods
                                                    </Link></li>
                                                    <li className=""> <Link to={`/category/toys_and_hobbies`}>Toys and Hobbies
                                                    </Link></li>
                                                    
                                 
                                    </ul>
                                  </div>
              
                                </div>
              
                              </li>
              
                            </ul>
              
              
                          </div>
              
                        </nav>
                      </div>
                    </div>
              
              
                    <div className='container'>

                    <h4 className="font-weight-bold mt-4 dark-grey-text">

  <strong>Our Products</strong>

</h4>

<hr/>

                      <Row>
                        {
                          products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                              <Product product={product} />
                            </Col>
                          ))
                        }
                      </Row>


                      <section>

        
<div className="row mt-5">


  <div className="col-12">

  
    <div className="view  z-depth-1">

      <img src="https://mdbootstrap.com/img/Photos/Others/ecommerce5.jpg" className="img-fluid"
        alt="sample image" />

      <div className="mask rgba-stylish-slight">

        <div className="dark-grey-text text-right pt-lg-5 pt-md-1 mr-5 pr-md-4 pr-0">

          <div>

           

              <span className="badge badge-primary">SALE</span>

          

            <h2 className="card-title font-weight-bold pt-md-3 pt-1">

              <strong>Sale from 20% to 50% on every tablet!

              </strong>

            </h2>

            <p className="pb-lg-3 pb-md-1 clearfix d-none d-md-block">Lorem ipsum dolor sit amet, consectetur

              adipisicing elit. </p>
          </div>

        </div>

      </div>

    </div>
   

  </div>


</div>


</section>


<section>

<h4 className="font-weight-bold mt-4 dark-grey-text">

  <strong>LAST ITEMS</strong>

</h4>

<hr className="mb-5" />
</section>


<Row>
                        {
                          products.slice(0, 4).map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                              <Product product={product} />
                            </Col>
                          ))
                        }
                      </Row>
                      <br />
                      <br />
                      </div>
       
     

                  </>
                )
            }



        </>
    )
}

export default HomeScreen
