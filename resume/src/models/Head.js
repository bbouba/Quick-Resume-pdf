import React, {useState, useLayoutEffect,  useEffect } from 'react';
import {Container, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import {useValidToken} from './CustomHooks'
import './style.css';
import logo from './logo.png'

const Head= (props)=>{
    const [token]=useValidToken()
    const handleClick=()=>{
        localStorage.setItem('accessToken', null)
        localStorage.setItem('refreshToken', null)
    }
    console.log(token)
    return(
        <Container className="bg-light">
            <nav className="row navbar d-flex align-items-center">
                <blockquote className="col-7 blockquote mb-0">
                    <Link to={`/`}><Image src={logo} className="d-inline-block align-top" alt="Photo"/></Link>
                    <p className="blockquote-footer">Welcome to the Quick professional resume</p>
                </blockquote>
                {   
                    token==='n' ? 
                    <div className=" col-4 navbar-brand d-flex justify-content-around menu" href="#">
                        <Link className="bg-info text-white mr-1 mt-1 rounded" to={`/login`}>LogIn </Link>
                        <Link className="bg-info text-white rounded mt-1" to={`/register`}> SignUp</Link>
                    </div>
                    :  <div className=" col-4 navbar-brand d-flex justify-content-around menu" href="#">
                            <Link className="bg-info text-white text-center mr-1 mb-1 rounded" to={`/profile`}>Profile</Link>   
                            <Link className="bg-info text-white text-center mr-1 mb-1 rounded" to={`/model`} target="_blank">PDF</Link>
                            <Link className="bg-info text-white text-center rounded" to={`/login`} onClick={handleClick}>LogOut</Link>
                        </div>
                }
                

            </nav>

        </Container>
    )
}

export default Head;
