import React from 'react';
import {Link} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Head from './Head'

const Success=()=>{
    return(
        <Container className="pb-5">
            <Head />
                <form className="bg-white text-center pt-3 pb-3">
                    <h1 className="col-12 display-4  text-center">Thank you</h1>
                    <h2 className="col-12 display-5  text-center text-success">Registration completed successfully</h2>
                    <Link to={`/login`}><button  className="col-6  text-center bg-success text-white" href="#">Login</button></Link>
                </form>
        </Container>
    )
}

export default Success