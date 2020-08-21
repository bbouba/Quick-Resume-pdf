import React, {useState, useEffect} from 'react';
import { Modal, Button, Row, Col, Form} from 'react-bootstrap'
import Exp from './AddExperience'

const EditPersonalInfo=(props)=>{
    
    const [data, setData]=useState({
        fullName: props.data.fullName,
        birthDate: '',
        email: props.data.email,
        gender: props.data.gender,
        profession: props.data.profession,
        otherProfile: props.data.otherProfile,
        contact:{
            phone: props.data.contact.phone,
            address: props.data.contact.address
        }
    })
    
    useEffect(()=>{
        let dateBirth = new Date(props.data.birthDate)
        const month=dateBirth.getMonth()+1 < 10 ? "0"+(dateBirth.getMonth()+1)+"-" : (dateBirth.getMonth()+1)
        const day= dateBirth.getDate() < 10 ? "0"+dateBirth.getDate() : dateBirth.getDate()
        dateBirth=dateBirth.getFullYear()+"-"+month+day
        setData({...data, birthDate: dateBirth })
    }, [])
   

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
        if (inputName==="gender"){
            setData({...data, gender: e.target.value })
        }
        if (inputName==="professions"){
            setData({...data, profession: e.target.value })
        }
        if (inputName==="profile"){
            setData({...data, otherProfile: e.target.value })
        }
        if (inputName==="telephone"){
            setData({...data, contact:{...data.contact, phone: e.target.value}})
        }
        if (inputName==="address"){
            setData({...data, contact: {...data.contact, address: e.target.value}})
        }
    }
    
    return(
      
        <Modal size="lg"  aria-labelledby="contained-modal-title-vcenter" show={props.show} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modify Personal informations
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e)=>{props.updateData(e, data); props.onHide()}}>
                    <Form.Group controlId="Infromations">
                    
                        <Row>
                            <Col sm={6}>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    required
                                    value={data.fullName}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col sm={6}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    value={data.email}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={4} sm={6}>
                                <Form.Label>Gender</Form.Label>
                                    <Form.Control as="select" name="gender" onChange={handleChange} value={data.gender}>
                                    <option>other</option>
                                    <option>male</option>
                                    <option>female</option>
                                </Form.Control>
                            </Col>
                            <Col lg={4} sm={6}>
                                <Form.Label>Birth Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    placeholder="Birth Date"
                                    required
                                    value={data.birthDate}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col lg={4} sm={12}>
                                <Form.Label>Professions (Separate by ',')</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="professions"
                                    placeholder="Professions1, Profession2,...."
                                    value={data.profession}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} lg={4} >
                                <Form.Label>Others Profiles (Separate by ',')</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="profile"
                                    placeholder="Profile1, Profile2,.... "
                                    value={data.otherProfile}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={6} lg={4} >
                                <Form.Label>Telephone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telephone"
                                    placeholder="Telephone"
                                    value={data.contact.phone}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={6} lg={4} >
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    placeholder="City, Street name an number"
                                    value={data.contact.address}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit" size="sm" block>Modify</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="dark">Close</Button>
            </Modal.Footer>
        </Modal>
        
    )
}

export default EditPersonalInfo