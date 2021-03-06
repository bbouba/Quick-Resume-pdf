import React, {useState, useEffect} from 'react';
import { Modal} from 'react-bootstrap'
import {editDate} from './FormatDate'

const EditExperience=(props)=>{
    const [data, setData]=useState({
        company: props.details.company,
        position: props.details.position,
        startDate: props.details.startDate,
        endDate: props.details.endDate,
        summary: props.details.summary
    })
    const [array, setArray]=useState(props.content)

    const handleChange=(e)=> {
        const inputName=e.target.name
        if (inputName==="company"){
            setData({...data, company: e.target.value })
        }
        if (inputName==="position"){
            setData({...data, position: e.target.value })
        }
        if (inputName==="summary"){
            setData({...data, summary: e.target.value })
        }
        if (inputName==="end"){
            setData({...data, endDate: e.target.value })
        }
        if (inputName==="start"){
            setData({...data, startDate: e.target.value })
        }
        
    }
    
    const handleSub=(e)=>{
        e.preventDefault()
        array[props.idx]=data
    }
    return(
       
        <Modal size="lg"  aria-labelledby="contained-modal-title-vcenter" show={props.show} centered>
             
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modify an experience
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row" onSubmit={(e)=>{handleSub(e); props.updateData(e, {works: array}); props.onHide() }}>
                    <div className="form-group col-lg-3 col-sm-6">
                        <label htmlFor="company">Company</label>
                        <input type="text" name="company" className="form-control" id="company" placeholder="Company name" 
                                value={data.company}   onChange={handleChange} required/>
                    </div>
                    <div className="form-group col-lg-3 col-sm-6">
                        <label htmlFor="position">Position</label>
                        <input type="text" name="position" className="form-control" id="position" placeholder="Position" 
                                value={data.position}   onChange={handleChange} required/>
                    </div>
                    <div className="form-group col-lg-3 col-sm-6">
                        <label htmlFor="start">Date start</label>
                        <input type="date" name="start" className="form-control" id="start" placeholder="Start date " 
                                value={editDate(data.startDate)}   onChange={handleChange} required/>
                    </div>
                    <div className="form-group col-lg-3 col-sm-6">
                        <label htmlFor="end">Date end</label>
                        <input type="date" name="end" className="form-control" id="end" placeholder="End date " 
                                value={editDate(data.endDate)}   onChange={handleChange} required/>
                    </div>
                    <div className="form-group col-sm-12">
                        <label htmlFor="summary">Summary</label>
                        <textarea id="summary" name="summary" className="form-control mb-1" rows="3" 
                                value={data.summary}   onChange={handleChange} required></textarea>
                    </div>
                    <div className="form-group text-center  col-sm-12">
                        <button type="submit" className="mybutton pt-1 pb-1 pr-2 pl-2 bg-info mr-2 rounded" >Save</button>
                        <label onClick={props.onHide} className="mybutton pt-1 pb-1 pr-2 pl-2 bg-danger  rounded">Cancel</label>
                    </div>       
                </form>
            </Modal.Body>
            
            </Modal>
           
    )
}

export default EditExperience