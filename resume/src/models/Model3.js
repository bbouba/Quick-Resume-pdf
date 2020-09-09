import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import {Link, Redirect} from 'react-router-dom';
import {useFetchData, useValidToken} from './CustomHooks'
import {displayDate} from './FormatDate'
import profPhoto from './profile.png'
import { Image, Container, Card } from 'react-bootstrap'

class ResumeType3 extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            user: this.props.userData,
            picture: this.props.picture,
            loading: this.props.loading
        }
    }
    
    render() {
        return(
            <>
                <div>
                    <Container>
                        <Card>
                            <Container className="d-flex justify-content-center" style={{backgroundColor: "black", color: "white"}}>
                            <div >
                                {
                                    this.state.picture ?
                                    <Image className="card-img-top" src={this.state.picture} alt="Profile Image" 
                                        width="50" style={{height: "150px", width: "150px"}}  roundedCircle/>
                                    :<Image className="card-img-top" src={profPhoto} alt="Profile Image"
                                        style={{height: "150px", width: "150px"}} roundedCircle/>
                                }
                                    <h2 className="d-flex flex-wrap justify-content-center" 
                                        style={{fontSize: "1.5em", marginTop: "5px" }}>{this.state.user.fullName}</h2>
                                    <p className="d-flex flex-wrap justify-content-center" style={{fontStyle: "italic"}}>{this.state.user.profession}</p>
                            </div>
                            </Container>
                            <Card>
                                <div className="d-inline-flex justify-content-center p-20px col-example" style={{backgroundColor: "black", color: "white"}}>
                                    <p style={{margin: "7px"}}>✉️{this.state.user.email}</p> 
                                    <p style={{margin: "7px"}}>🔘{this.state.user.contact.address}</p>
                                    <p style={{margin: "7px"}}>📞{this.state.user.contact.phone}</p>
                                </div>
                            </Card>
                                <table className="table" style={{width: "60%"}}>
                                    <tbody>
                                    <tr className="d-flex flex-column justify-content-center">
                                        <td><span style={{fontSize: "1.7em"}}>Personal profile: </span> 
                                                <p style={{fontSize: "1.3em"}}>{this.state.user.summary}</p></td>
                                        <td><span style={{fontSize: "1.7em"}}>Works Experience: </span>
                                            <ul>
                                            {
                                                this.state.user.works.map((work, idx)=> <li key={work.position+idx} style={{fontSize: "1.3em"}}>
                                                    <strong><u>{displayDate(work.startDate)} - {displayDate(work.endDate)} 
                                                    :</u> {work.position}, {work.company}</strong><p>{work.summary}</p></li>)
                                            }
                                            </ul></td>
                                        <td><span style={{fontSize: "1.7em"}}>Education:</span>
                                            <ul>
                                            {
                                                this.state.user.educations.map((educ, idx)=> <li key={educ.area+idx} style={{fontSize: "1.3em"}}>
                                                    <strong><u>{displayDate(educ.startDate)} - {displayDate(educ.endDate)} 
                                                    :</u> {educ.area}, {educ.institution}</strong><p>{educ.summary}</p></li>)
                                            }
                                            </ul></td>
                                        <td> <span style={{fontSize: "1.7em"}}>Others Skills:</span>
                                            <ul>
                                            {
                                                this.state.user.skills.map((skill, idx)=> <li key={skill.name+idx} style={{fontSize: "1.3em"}}>
                                                    <strong><u>{skill.name} 
                                                    :</u></strong><p>{skill.summary}</p></li>)
                                            }
                                            </ul></td>
                                            <td><span style={{fontSize: "1.7em"}}>Personal interest: </span> 
                                                <p style={{fontSize: "1.3em"}}>{this.state.user.interest}</p></td>
                                    </tr>
                                    </tbody> 
                                </table>
                        </Card>
                    </Container>
                </div>
            </>
        )
    }
}

const Model3 = () => {
    const [userData, picture, loading]=useFetchData()
    const token=useValidToken()
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <>
            {
                token!=="null" ?
                    <div className="overflow-auto pt-3"  style={{"height": "100vh", fontFamily: "arial"}}>
                        <div className="text-center">
                            <button style={{fontSize: "1.5em"}} onClick={handlePrint}> Print or Save the PDF!</button>
                            <Link className="bg-info text-white text-center ml-1 p-2 rounded" to={`/model`}>Back to choose models </Link>
                        </div>
                        {
                            !loading ? <ResumeType3 ref={componentRef}  userData={userData} picture={picture}  loading={loading} token={token}/> : ''
                        }
                    </div>
                : <Redirect to='/login' />
            }
        </>
    );
};

export default Model3