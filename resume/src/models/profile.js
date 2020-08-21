import React, { useEffect, useLayoutEffect, useState } from 'react';
import Head from './Head'
import UserProvider from '../APIFetch'
import {useFetchData, useValidToken} from './CustomHooks'
import {Redirect} from 'react-router-dom';
import {Container, Image} from 'react-bootstrap'
import './style.css';
import profPhoto from './profile.png'
import PopEdit from './PopEdit1'
import BodyElement1 from './Body1'
import BodyElement2 from './Body2'

function Profile() {

  const [updated, setUpdated]=useState(false)
  const [userData, picture, loading]=useFetchData(updated)
  const [token]=useValidToken()
  const [addModal, setAddModal]= useState(false)

  const updateData=async (e, dataUp)=>{
    
      e.preventDefault()
      if(dataUp!==null){
          let payload = JSON.parse(atob(localStorage.getItem('accessToken').split(".")[1]))
          const updateResult = await UserProvider. updateUser(`user/update/${payload.id}`, dataUp, false, localStorage.getItem('accessToken'));
          if(updateResult.success){
              console.log('Updated succesfully.')
              updated ? setUpdated(false) : setUpdated(true)
          }else{
              console.log(updateResult.error)
          }   
      }else{
          console.log("Any changes done")
      }
      
  }

  const handlePictureChange=async (event)=>{

      let payload = JSON.parse(atob(localStorage.getItem('accessToken').split(".")[1]));
      const formData = new FormData()
      formData.append(`file`, event.target.files[0])
      const pictureResult = await UserProvider.postUser(formData, `user/picture/${payload.id}/upload`, true, localStorage.getItem('accessToken'));

      if(pictureResult.success){
        updated ? setUpdated(false) : setUpdated(true)
      }
     
  }

  const closeModal=()=>{
    setAddModal(false)
  }

  const openModal=()=>{
    setAddModal(true)
  }

return (
  <div className="container-fluid overflow-auto pb-3" style={{"height": "100vh", fontSize: "1.3em", "background": "rgba(177, 207, 148)"}} >
      <Head/>
      {
        token!=="n" ?  !loading ?<Body data={userData} picture={picture} closeModal={closeModal}
          openModal={openModal} addModal={addModal}   handlePictureChange={handlePictureChange} updateData={updateData}/> 
        : <p className="text-center">Loading...</p> 
        : <Redirect to='/login' />
      }
     
  </div>
);
}

const Body= (props)=>{
  
  return(
      <Container>
            <div className="row d-flex">
                  <div className="card col-md-6 ">
                      <div className=" row bg-light d-flex flex-row justify-content-center">
                      <div className="col-sm-4 text-center imagediv">
                          {
                              props.picture ? <Image className="card-img-top" height="140" 
                                  src={props.picture} alt="Profile Image" roundedCircle/>
                              : <Image className="card-img-top" height="140" src={profPhoto} alt="Profile Image" roundedCircle/>
                          }
                          <label className="mybutton bg-info p-1 text-white rounded" htmlFor="myfile">Add Photo
                          <input type="file" id="myfile" name="myfile" onChange={props.handlePictureChange} /></label>
                      </div>
                      <div className="col-sm-8 textdiv">
                          <Display info={props.data.fullName} font={true}/>
                          <Display info={props.data.profession} font={true}/>
                          <Display info={props.data.email} />
                          {
                              props.data.otherProfile ?
                              props.data.otherProfile.split(",").map((profile, idx)=>
                                <div className="mr-3" key={idx}><a href="#">{profile.trim()}</a></div>
                              )
                            : ''
                          }
                          
                          <Display info={props.data.contact.phone} />
                          <Display info={props.data.contact.address} />
                          <a  href="#" onClick={props.openModal}><span className="bg-info rounded text-white">Modify</span></a>
                      </div>
                      </div>
                  </div>
                  <div className="card bg-light col-md-6">
                      <BodyElement1 content={props.data.summary}  title="Personal profile" updateData={props.updateData}/>
                  </div>
            </div>
            <div className="card row pl-4 pr-4 pt-2 bg-light">
                <BodyElement2 content={props.data.works}  title="Works Experience" updateData={props.updateData}/>
            </div>
            <div className="card row pl-4 pr-4 pt-2 bg-light">
                <BodyElement2 content={props.data.educations}  title="Education" updateData={props.updateData}/>
            </div>
            <div className="card row pl-4 pr-4 pt-2 bg-light">
                <BodyElement2 content={props.data.skills}  title="Others Skills" updateData={props.updateData}/>
            </div>
            <div className="card row pl-4 pr-4 pt-2 bg-light">
                <BodyElement1 content={props.data.interest}  title="Personal interests" updateData={props.updateData}/>
            </div>
            <PopEdit show={props.addModal} onHide={props.closeModal} data={props.data} updateData={props.updateData} />
      </Container>
  )
}

const Display=(props)=>{ 
    return(
      <div>
          {
            props.font ?  <span className="mr-3" style={{"fontSize": "1.2em"}}>{props.info} </span>: <span className="mr-3">{props.info} </span>
          } 
      </div>
    )
}

export default Profile;
