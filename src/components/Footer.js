import React from "react";

function Footer () {
    return(
        <>
        <div className="bg-dark">
            <footer className="f-flex flex-wrap justify-content-between align-items-center py-0 my-5 border-top">
            <p className="col-md-4 mb-0 text-white">&#169; Copyright Alkemy Challenge</p>
            <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">           
           </a>
           <ul className="col-md-4 justify-content-end">
               <li className="nav-item"><a href="https://www.instagram.com/" className="nav-link px-2 text-white">Instagram</a></li>
               <li className="nav-item"><a href="https://www.facebook.com/" className="nav-link px-2 text-white">Facebook</a></li>
               <li className="nav-item"><a href="https://twitter.com/" className="nav-link px-2 text-white">Twitter</a></li>              
           </ul>                
            </footer>
        </div>
        </>
    )
}

export default Footer;