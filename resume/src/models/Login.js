import React, {useState} from 'react';
import {Container} from 'react-bootstrap'
import {Redirect} from 'react-router-dom';
import UserProvider from '../APIFetch'
import Head from './Head'

const Login=()=>{
    const [data, setData]=useState({
        email: '',
        password: ''
    })
    const [login, setLogin]=useState(false)
    const [error, setError]=useState('')

    const handleChange=(e)=> {
        const inputName=e.target.name
        
        if (inputName==="email"){
            setData({...data, email: e.target.value })
        }
        if (inputName==="psw"){
            setData({...data, password: e.target.value })
        }
    }

    const handleSubmit= async (e)=>{
        e.preventDefault()
        const loginResult = await UserProvider.postUser(data, `user/login`);

        if(loginResult.success){
            localStorage.setItem('accessToken', loginResult.tokens.accessToken)
            localStorage.setItem('refreshToken',loginResult.tokens.refreshToken)
            setLogin(true)
        }else{
            setError(loginResult.error)
            setTimeout(()=> {setError('')}, 5000)
        }
    }
    return(
        <Container className="overflow-auto" style={{"height": "100vh", "background": "rgba(177, 207, 148)"}}>
            <Head />
            {
                !login ? 
                    <Form handleChange={handleChange} handleSubmit={handleSubmit} error={error}/>
                : <Redirect to='/profile' />
            }
        </Container>
    )
}

const Form=(props)=>{
    return(
        <div className="mt-3 card pb-5 pl-5 pr-5">
            <form onSubmit={props.handleSubmit}>
                <p className="text-center" style={{fontSize: "2.5rem"}}>Login Page</p>
                <div className="text-danger text-center">{props.error}</div>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                            <label htmlFor="Email">Email</label>
                            <input type="email" name="email" id="Email" onChange={props.handleChange} className="form-control" placeholder="Email" 
                                required/>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <label htmlFor="password">PassWord</label>
                        <input type="password" name="psw" id ="password" onChange={props.handleChange}  className="form-control" placeholder="Password" 
                            required/>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    <button type="submit" className=" col-6 btn btn-info text-center">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login