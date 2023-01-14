import React from "react";

export default function Question(props){
   
    const [chose, setChose] = React.useState(props.answers)
    function handleChose(id){
        setChose(prev=>prev.map((ans, index)=>{
            if(id===index){
                return ({...ans, chose:!ans.chose})
            } else {
                return ({...ans, chose:false})
            }
        }))
        console.log(chose)
    }
    
    return (
        <div className='container question--box'>
            <div className='question'>
                <h2>{props.question}</h2>
            </div>
            <div className="answers">            
                {!props.check?chose.map((ans, ansIndex)=>(
                    <button id={ans.chose?"chosen":""} onClick={()=>handleChose(ansIndex)}>{ans.value}</button>
                )):chose.map((ans, ansIndex)=>(
                    <button id={ans.chose&&!ans.correct?"wrong":
                                !ans.chose&&ans.correct?"right":
                                ans.chose&&ans.correct?"right":""} onClick={()=>handleChose(ansIndex)}>{ans.value}</button>
                ))} 
            </div>
        </div>
    )
}