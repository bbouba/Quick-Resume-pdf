import React, {useState} from 'react';

const BodyElement1=(props)=>{
  
    const [edit, setEdit]=useState(false)
    const [data, setData]=useState({
        content: props.content
    })
    const [sendData, setSendData]=useState(null)

    const handleChange=(e)=>{
        setData({content: e.target.value})
        if(props.title==="Personal profile"){
            setSendData({summary: e.target.value})
        }else{
            setSendData({interest: e.target.value})
        }
    }

  return(
    <>
        <span style={{"fontSize": "1.3em"}} className="card-title">{props.title} :</span>
        {
            edit ? <form>
                        <div className="form-group text-center">
                          <textarea className="form-control mb-1" rows="4" onChange={handleChange} value={data.content}></textarea>
                          <label onClick={(e)=>{ props.updateData(e, sendData);  setEdit(false)}} className="mybutton bg-info p-1 mr-2 rounded">Save</label>
                          <label onClick={()=>setEdit(false)} className="mybutton bg-danger p-1 rounded">Cancel</label>
                        </div>    
                    </form>
            : <span className="pb-2">
                <span className="card-text">{data.content}</span>
                <a href="#"><span onClick={()=>setEdit(true)} className="bg-info rounded text-white ml-3">Modify</span></a>
            </span>
        }
        
    </> 
  )
}

export default BodyElement1