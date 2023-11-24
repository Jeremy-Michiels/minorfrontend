import { useEffect, useState } from "react"

export default function StockOptions(props){
    const [opt, setOpt] = useState({})
    const [load, setLoad] = useState(false)

    function set(){
        props.setOpt();
    }

    useEffect(() => {
        if(!load){
            setOpt(props.opt)
            setLoad(true)
        }
    })

    
    if(load){
        return (
            <>
            <div className="col border border-dark rounded m-1 p-1" style={{cursor: "pointer"}} onClick={set}>
                {opt.name}  
            </div>
            </>
        )
    }
    
}


    

