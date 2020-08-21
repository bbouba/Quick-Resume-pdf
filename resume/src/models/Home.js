import React, {useState} from 'react'
import Head from "./Head"

const Home=()=>{
   
    return(
        <div className="overflow-auto" style={{"height": "100vh"}}>
            <Head/>
            <div className="bg-light p-5">
                <p style={{"fontSize": "2rem"}}>Welcome to the Quick professional resume</p>
                <p>This web site is helping you to build quickly, <strong>professionnal resume</strong> in differents style with pdf format.<br/>
                First, You have make quick register by clicking SignUp link and then, Login and fill your different informations 
                that you want to saw in the resumein your personnal profile.<br/> Good luck for your looking for job.</p>
            </div>
        </div>
        
    )
}

export default Home