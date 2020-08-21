import React, {useState, useEffect} from 'react';
import { Modal} from 'react-bootstrap'
import {editDate} from './FormatDate'

const EditEducation=(props)=>{
    const [data, setData]=useState({
        institution: props.details.institution,
        area: props.details.area,
        startDate: props.details.startDate,
        endDate: props.details.endDate,
        summary: props.details.summary
    })
    const [array, setArray]=useState(props.content)

    const handleChange=(e)=> {
        const inputName=e.target.name
        if (inputName==="institution"){
            setData({...data,institution: e.target.value })
        }
        if (inputName==="area"){
            setData({...data, area: e.target.value })
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
                    Modify an education
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row" onSubmit={(e)=>{handleSub(e); props.updateData(e, {educations: array}); props.onHide() }}>
                    <div className="form-group col-lg-3 col-sm-6">
                        <label htmlFor="institution">Institution</label>
                        <input type="text" name="institution" className="form-control" id="institution" placeholder="Institution name" 
                                value={data.institution}   onChange={handleChange} required/>
                    </div>
                    <div className="form-group col-lg-3 col-sm-6">
                        <label htmlFor="area">Area</label>
                        <input type="text" name="area" className="form-control" id="area" placeholder="Area" 
                                value={data.area}   onChange={handleChange} required/>
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

export default EditEducation