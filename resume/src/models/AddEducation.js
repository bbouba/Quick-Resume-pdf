import React, {useState, useEffect} from 'react';
import { Modal} from 'react-bootstrap'

const AddExperience=(props)=>{
    const [data, setData]=useState({
        institution: '',
        area: '',
        startDate: '',
        endDate: '',
        summary: ''
    })
    let array=props.education

    const handleChange=(e)=> {
        const inputName=e.target.name
        if (inputName==="institution"){
            setData({...data, institution: e.target.value })
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
        array.push(data)
    }
    
    return(
        <Modal size="lg"  aria-labelledby="contained-modal-title-vcenter" show={props.show} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add an education
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row" onSubmit={(e)=>{handleSub(e); props.updateData(e, {educations: array})}}>
                    <div className="form-group col-lg-3 col-sm-6">
                        <label htmlFor="institution">Institution</label>
                        <input type="text" name="institution" className="form-control" id="institution" placeholder="Institution name" 
                                onChange={handleChange} required/>
                    </div>
                    <div className="form-group col-lg-3 col-sm-6">
                        <label htmlFor="area">Area</label>
                        <input type="text" name="area" className="form-control" id="area" placeholder="Area" 
                                onChange={handleChange} required/>
                    </div>
                    <div className="form-group col-lg-3 col-sm-6">
                        <label htmlFor="start">Date start</label>
                        <input type="date" name="start" className="form-control" id="start" placeholder="Start date " 
                                onChange={handleChange} required/>
                    </div>
                    <div className="form-group col-lg-3 col-sm-6">
                        <label htmlFor="end">Date end</label>
                        <input type="date" name="end" className="form-control" id="end" placeholder="End date " 
                                onChange={handleChange} required/>
                    </div>
                    <div className="form-group col-sm-12">
                        <label htmlFor="summary">Summary</label>
                        <textarea id="summary" name="summary" className="form-control mb-1" rows="3" 
                                onChange={handleChange} required></textarea>
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

export default AddExperience