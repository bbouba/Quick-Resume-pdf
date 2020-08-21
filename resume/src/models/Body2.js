import React, {useState} from 'react';
import AddExp from './AddExperience'
import AddEduc from './AddEducation'
import AddSkills from './AddOtherSkills'
import DisplayArray from './DisplayArray'

const BodyElement2=(props)=>{
    
    const [addModal, setAddModal]=useState(false)
  
    const closeModal=()=>{
      setAddModal(false)
    }
  
    const openModal=()=>{
      setAddModal(true)
    }
    
    const Delete=(e, delElement)=>{
        const newArray=props.content.filter(element=>element!==delElement)
        if(props.title==="Works Experience"){
            props.updateData(e, {works: newArray})
        }else if (props.title==="Education"){
            props.updateData(e, {educations: newArray})
        }else {
            props.updateData(e, {skills: newArray})
        }
        
    }
   
    return(
        <> 
            <span style={{"fontSize": "1.3em"}}>{props.title} :</span>
            <DisplayArray updateData={props.updateData} content={props.content} openModal={openModal}
                        show={addModal} onHide={closeModal} Delete={Delete}/>
            <div className="form-group text-center text-white col-sm-12">
                  <label onClick={openModal} className="mybutton bg-info rounded">Add new</label>
            </div>
            {
                props.title==="Works Experience" ? <AddExp show={addModal} onHide={closeModal} works={props.content} updateData={props.updateData} /> 
                : props.title==="Education" ? <AddEduc show={addModal} onHide={closeModal} education={props.content} updateData={props.updateData} /> 
                : <AddSkills show={addModal} onHide={closeModal} skill={props.content} updateData={props.updateData} /> 
            }
            
          
        </>  
    )
}

export default BodyElement2
