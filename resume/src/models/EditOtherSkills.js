import React, {useState, useEffect} from 'react';
import { Modal} from 'react-bootstrap'

const EditOtherSkills=(props)=>{
    const [data, setData]=useState({
        name: props.details.name,
        summary: props.details.summary
    })
    const [array, setArray]=useState(props.content)

    const handleChange=(e)=> {
        const inputName=e.target.name
        if (inputName==="name"){
            setData({...data, name: e.target.value })
        }
        if (inputName==="summary"){
            setData({...data, summary: e.target.value })
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
                    Modify an skill
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row" onSubmit={(e)=>{handleSub(e); props.updateData(e, {skills: array}); props.onHide() }}>
                    <div className="form-group col-lg-4 col-md-12">
                        <label htmlFor="name">Skill name</label>
                        <input type="text" name="name" className="form-control" id="name" placeholder="Skill name" 
                                value={data.name}   onChange={handleChange} required/>
                    </div>
                    <div className="form-group col-lg-8 col-md-12">
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

export default EditOtherSkills