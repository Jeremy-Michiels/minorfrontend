import { useEffect, useState } from "react"
import {useLocation } from "react-router-dom"
import StockOptions from "../Parts/StockOptions"

function EditStock(props){

    const [item, setItem] = useState({})
    const [load, setLoad] = useState(false)
    const [back, setBack] = useState(() => {})
    const [selOpt, setSelOpt] = useState({})

    

    useEffect(() =>{
        if(!load){
            setItem(props.item)
            setLoad(true)
        }
    }, [])
    if(load){
        return (
            <>
            {console.log(item)}
                <div className='row'>
              <div className='col-auto'>
              <div className='border border-dark rounded p-2' onClick={props.back} style={{cursor: 'pointer'}}>
                <h1 className='text-start'>Go Back</h1>
                </div>
                </div>
                </div>
    
                <div className='row m-3 p-3 items rounded'>
                    <div className="col">
                        <h3>{item.title}</h3>
                        <h5>Options:</h5>
                        <div className="row">
                            {item.options.map(opt => (
                                <StockOptions key={opt.id} opt={opt} setOpt={() => setSelOpt(opt)}></StockOptions>
                            ))}
                            <div className="col-auto">
                                <button className="btn btn-success" onClick={() => setSelOpt({id: "+"})}>
                                    +
                                </button>
                            </div>
                        </div>

                        {selOpt.id !== undefined ? (
                            <div className="row border border-dark rounded p-1">
                                {selOpt.name}
                        </div>
                        ) : <></>}
                        

                    </div>
                    <div className="col">
                        <img src={item.images[0].src} style={{width: "50%"}} className="border border-dark rounded"></img>
                    </div>
                </div>
                </>
        )
    }
    else{
        return (
            <div className="loader"></div>
        )
    }
    
}
export default EditStock