import React, { useState, useRef, useEffect } from 'react';
import './print.css';
import { useReactToPrint } from 'react-to-print';
import {Link, Redirect} from 'react-router-dom';
import {useFetchData, useValidToken} from './CustomHooks'
import {displayDate} from './FormatDate'
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
                    <Container className='d-flex flex-row'>
                        <Card className='p-5' style={{fontFamily: 'arial sans-serif', width: "70%"}}>
                            <Container style={{color: "dark"}}>
                                <h3 style={{fontSize: '1.7em'}}>{this.state.user.fullName}</h3>
                                <p style={{fontSize: "0.8em"}}>{this.state.user.summary}</p>
                            </Container>
                                <table className="table" style={{width: "100%"}}>
                                    <tbody>
                                    <tr className="d-flex flex-column justify-content-center">
                                        <td><span style={{fontSize: "0.8em"}}>Works Experience: </span>
                                            {
                                                this.state.user.works.map((work, idx)=> <tr key={work.position+idx} style={{fontSize: "0.8em", 
                                                    listStyle: 'none'}}> <td style={{width: '35%'}}><strong><u>{displayDate(work.startDate)} - 
                                                        {displayDate(work.endDate)} : </u> {work.position}, {work.company}</strong></td>
                                                    <td style={{borderLeft: '2px solid black', width: '65%'}}><p>{work.summary}</p></td></tr>)
                                                }
                                        </td>
                                        <td><span style={{fontSize: "1em"}}>Education:</span>
                                            {
                                                this.state.user.educations.map((educ, idx)=> <tr key={educ.area+idx} style={{fontSize: "0.8em"}}>
                                                    <td style={{width: '35%'}}><strong><u>{displayDate(educ.startDate)} - 
                                                        {displayDate(educ.endDate)} : </u> {educ.area}, {educ.institution}</strong></td>
                                                        <td style={{borderLeft: '2px solid black', width: '65%'}}><p>{educ.summary}</p></td></tr>)
                                            }
                                            </td>
                                            
                                    </tr>
                                    </tbody> 
                                </table>
                        </Card>
                        <Card className='p-5' style={{fontFamily: 'arial sans-serif', width: "30%"}}>
                            <table className="table" style={{width: "100%"}}>
                                <tbody>
                                    <tr>
                                        <td style={{fontSize: "1em"}}>Personal interest: </td> 
                                    </tr>
                                    <tr>
                                        <td><p style={{fontSize: "0.8em"}}>{this.state.user.interest}</p></td>
                                    </tr>
                                    <tr>
                                        <td> <span style={{fontSize: "1em"}}>Others Skills:</span></td>
                                    </tr>
                                    <tr>
                                        {
                                            this.state.user.skills.map((skill, idx)=> <td key={skill.name+idx} style={{fontSize: "0.8em",
                                                listStyle: 'none'}}>
                                            <strong><u>{skill.name} 
                                                :</u></strong><p>{skill.summary}</p></td>)
                                        }
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

const Model4 = () => {
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
                    <div className="overflow-auto pt-3"  style={{"height": "100vh"}}>
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

export default Model4