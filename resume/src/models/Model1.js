import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import {Link, Redirect} from 'react-router-dom';
import {useFetchData, useValidToken} from './CustomHooks'
import {displayDate} from './FormatDate'
import profPhoto from './profile.png'
import {Image} from 'react-bootstrap'
 
class ToPrintMod extends React.Component {
    
    constructor(props){
        super(props);
        this.state= {
            user: this.props.userData,
            picture: this.props.picture,
            loading: this.props.loading
        }
    }
   
    render() {
        
            return (
                <div className="row d-flex flex-row pt-5"> 
                    <table className="table ml-5 mr-4" style={{width: "25%"}}> 
                        <tbody>
                            <tr className="d-flex flex-column justify-content-center" style={{lineHeight: "1em"}}>
                                {
                                    this.state.picture ?
                                        <td  className="text-center"><Image className="card-img-top" src={this.state.picture} 
                                        style={{width: "65%"}} alt="Profile Image" roundedCircle/></td>
                                    : <td className="text-center"><Image className="card-img-top" src={profPhoto}  style={{width: "65%"}}
                                                alt="Profile Image" roundedCircle/></td>
                                }
                                <td style={{fontSize: "1.3em"}}>{this.state.user.fullName}</td>
                                <td style={{fontSize: "1.2em"}}>{this.state.user.profession}</td>
                                <td style={{fontSize: "1.1em"}}>Birth date: {displayDate(this.state.user.birthDate)}</td>
                                {
                                    this.state.user.gender.length>0 ?
                                        <td style={{fontSize: "1.1em"}}>Sexe: {this.state.user.gender}</td>
                                    :<td>gender</td>
                                }
                                <td style={{fontSize: "1.1em"}}>{this.state.user.email}</td>
                                {
                                    this.state.user.otherProfile!==undefined ?
                                        this.state.user.otherProfile.split(",").map((profile, idx)=>
                                            <td key={idx} style={{fontSize: "1.1em"}}><a href="#">{profile.trim()}</a></td>)
                                    : <td>Others profile</td>
                                }
                                
                                <td style={{fontSize: "1.1em"}}>{this.state.user.contact.phone}</td>
                                <td style={{fontSize: "1.1em"}}>{this.state.user.contact.address}</td>
                            </tr>
                        </tbody>
                    </table>
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
                </div>
            );
    }
}
 
const Model1 = () => {
    const [userData, picture, loading]=useFetchData()
    const [token]=useValidToken()
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    
    return (
        <>
        {
            token!=="n" ?
                <div className="overflow-auto pt-3"  style={{"height": "100vh", fontFamily: "arial"}}>
                    <div className="text-center">
                        <button style={{fontSize: "1.5em"}} onClick={handlePrint}> Print or Save the PDF!</button>
                        <Link className="bg-info text-white text-center ml-1 p-2 rounded" to={`/model`}>Back to choose models </Link>
                    </div>
                    {
                        !loading ? <ToPrintMod ref={componentRef}  userData={userData} picture={picture}  loading={loading} token={token}/> : ''
                    }
                </div>
            : <Redirect to='/login' />
        }
        </>
    );
};

export default Model1