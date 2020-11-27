import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="page-footer text-center text-md-left stylish-color-dark pt-0">

        
        <div className="container mb-4 text-center text-md-left">
    
          <div className="row">
            <div className="col-md-4 mt-5">
    
              <h6 className="text-uppercase font-weight-bold">
    
                <strong>Daily_Deals</strong>
    
              </h6>
    
              <hr className="blue mb-4 mt-0 d-inline-block mx-auto" style={{width:60}} />
    
              <p>Daily_Deals is the best place for the customers to visit and purchase anything they need in their day to day life. We all are here to help you and make a great connection with You.</p>
    
            </div>
           
            <div className="col-md-4 mt-5">
    
              <h6 className="text-uppercase font-weight-bold">
    
                <strong>Products</strong>
    
              </h6>
    
              <hr className="blue mb-4 mt-0 d-inline-block mx-auto" style={{width:60}}  />
    
              <p>
    
               <Link to='/category/electronics'>Electronics</Link>
    
              </p>
    
              <p>
    
              <Link to='/category/fashion'>Fashion</Link>
    
              </p>
    
              <p>
    
              <Link to='/category/home_and_garden'>Home and Garden</Link>
    
              </p>
    
              <p>
    
              <Link to='/category/sporting_goods'>Sporting Goods</Link>
    
              </p>
              <p>
    
              <Link to='/category/toys_and_hobbies'>Toys and Hobbies</Link>

    </p>
    
            </div>
                      
            <div className="col-md-4 mt-5">
    
              <h6 className="text-uppercase font-weight-bold">
    
                <strong>Contact</strong>
    
              </h6>
    
              <hr className="blue mb-4 mt-0 d-inline-block mx-auto" style={{width:60}}  />
    
              <p>
    
                <i className="fas fa-home mr-3"></i> No.50, Station Road, Amblanagoda</p>
    
              <p>
    
                <i className="fas fa-envelope mr-3"></i> supunawa@gmail.com</p>
    
              <p>
    
                <i className="fas fa-phone mr-3"></i> + 15 216 627 21</p>
    
              <p>
    
                <i className="fas fa-print mr-3"></i>+ 15 216 627 21</p>
    
            </div>
            
          </div>
    
        </div>
      
        <div className="footer-copyright py-3 text-center">
    
          <div className="container-fluid">
    
            © 2020 Copyright:
    
            <a> Designed By Supuna Warusawithana</a>
    
          </div>
    
        </div>
      
      </footer>
    )
}

export default Footer
