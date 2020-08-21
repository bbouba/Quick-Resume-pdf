import React, {useState} from 'react'
import {useValidToken} from './CustomHooks'
import {Link, Redirect} from 'react-router-dom';

const DifferentModel=()=>{
    const [value, setValue]=useState(0)
    const [token]=useValidToken()

    console.log(token)
    return(
        <>
        {
            token!=="n" ?
                <div className="container row text-center pt-5 pb-5" style={{fontSize: "1.5em"}}>
                    <h1 className="col-sm-12">Welcome to the Quick professional resume</h1>
                    <h4 className="col-sm-12">choose your model to print or save</h4>
                    <div className="card col-md-4 col-sm-6 pt-5 pb-5">
                        <Link to={`/model1`}>Model1</Link>
                    </div>
                    <div className="card  col-md-4 col-sm-6  pt-5 pb-5">
                        Model2
                    </div>
                    <div className="card  col-md-4 col-sm-6 pt-5 pb-5">
                        Model3
                    </div>
                    <div className="card  col-md-4 col-sm-6 pt-5 pb-5">
                        Model4
                    </div>
                    <div className="card  col-md-4 col-sm-6 pt-5 pb-5">
                        Model5
                    </div>
                    <div className="card  col-md-4 col-sm-6 pt-5 pb-5">
                        Model6
                    </div>
                </div>
            : <Redirect to='/login' />
        }
        </>
    )
}

export default DifferentModel