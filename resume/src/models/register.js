import React, {useState} from 'react';
import UserProvider from '../APIFetch'
import {Container} from 'react-bootstrap'
import {Redirect} from 'react-router-dom';
import './style.css';
import Head from './Head';


const Form=(props)=>{
    return(
        <Container className="overflow-auto" style={{"height": "100vh", "background": "rgba(177, 207, 148)"}}>
            <div className="mt-3 card pb-5 pl-5 pr-5">
    
                <form onSubmit={props.handleSubmit}>
                    <p className="text-center" style={{"fontSize": "2.5rem"}}>Registration Page</p>
                    <div className="text-danger text-center">{props.error}</div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="Name">Full Name</label>
                            <input type="text" name="fullName" id ="Name" className="form-control" placeholder="Full name" 
                                onChange={props.handleChange} required/>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="Date">Date of birth</label>
                            <input type="date" name="date" className="form-control" placeholder="Date of birth" 
                                onChange={props.handleChange} required/>
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="Email">Email</label>
                            <input type="email" name="email" id="Email" className="form-control" placeholder="Email" 
                                onChange={props.handleChange} required/>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="password">PassWord</label>
                            <input type="password" name="psw" id ="password"  className="form-control" placeholder="Password" 
                                onChange={props.handleChange} required/>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <button type="submit" className=" col-6 btn btn-info text-center">Register</button>
                    </div>
                        
                </form>
                
            </div>
        </Container>
    )    
}

const Register= ()=>{
    let [data, setData]=useState({
        fullName: '',
        email: '',
        password:'',
        birthDate: '',
    })
    let [saveData, setSaveData]=useState(false)
    const [error, setError]=useState('')

    const handleChange=(e)=> {
        const inputName=e.target.name
        if (inputName==="fullName"){
            setData({...data, fullName: e.target.value })
        }
        if (inputName==="date"){
            setData({...data, birthDate: e.target.value })
        }
        if (inputName==="email"){
            setData({...data, email: e.target.value })
        }
        if (inputName==="psw"){
            setData({...data, password: e.target.value })
        }
    }

    const handleSubmit= async (e)=>{

        e.preventDefault()
        const registerResult = await UserProvider.postUser(data, `user/register`);

        if(registerResult.success){
            setSaveData(true)
        }else{
            setError(registerResult.error)
            setTimeout(()=> {setError('')}, 5000)
        }
    }
    
    return(
        
        <div className="overflow-auto bg-light" style={{"height": "100vh"}}>
            <Head />
            {
                !saveData ?
                    <Form handleChange={handleChange} handleSubmit={handleSubmit} saveData={saveData} error={error}/> 
                : <Redirect to='/success' />
            }
        </div>
        
            
    )
}

export default Register;
