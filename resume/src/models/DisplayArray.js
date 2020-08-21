import React, {useState} from 'react';
import EditExp from './EditExperience'
import EditEduc from './EditEducation'
import EditSkills from './EditOtherSkills'
import {displayDate} from './FormatDate'

const DisplayArray=(props)=>{
    const [choose, setChoose]=useState(null)
    const [idx, setIdx]=useState('')
    const [addModal, setAddModal]=useState(false)
  
    const closeModal=()=>{
        setAddModal(false)
        setChoose(null)
        setIdx('')
    }
  
    const openModal=(infos, id)=>{
        setIdx(id)
        setChoose(infos)
        setAddModal(true)
    }

    return(
        <ul>
        {
            props.content.length > 0 ? props.content.map((infos, indx)=><li key={indx}>
                    <span><u>
                    {
                        infos.name ? <strong>{infos.name} </strong>
                        :<strong>{displayDate(infos.startDate)} - {displayDate(infos.endDate)}</strong>
                    } :</u></span>
                    <span> 
                        {
                            infos.position ? <span> {infos.position}, {infos.company} <br/></span> 
                            : infos.area ? <span> {infos.area} at {infos.institution} <br/></span> : ''
                        }
                    </span>
                    <span> {infos.summary}</span>
          
                    <label><label className="mybutton bg-info mr-2 ml-5 text-white rounded" onClick={()=>openModal(infos, indx)} >Edit</label>
                    <label onClick={e=>props.Delete(e, infos)} className="mybutton bg-danger text-white rounded">Delete</label></label>
                    { choose!==null ? infos.position ? <EditExp show={addModal} onHide={closeModal} content={props.content} details={choose} 
                            idx={idx} updateData={props.updateData}/> 
                                :  infos.area ? <EditEduc show={addModal} onHide={closeModal} content={props.content} details={choose} 
                                        idx={idx} updateData={props.updateData}/>   
                                : <EditSkills show={addModal} onHide={closeModal} content={props.content} details={choose} idx={idx} 
                                        updateData={props.updateData}/>   
                    : '' }
                    </li>)
            : ''
        }
        </ul>
    )
}

export default DisplayArray