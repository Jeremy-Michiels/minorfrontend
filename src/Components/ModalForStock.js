import { useEffect, useRef, useState } from "react"

export default function ModalForStock(props){

    const [item, setItem] = useState({})
    const [load, setLoad] = useState(false)

    const modal = useRef();
    const modalC = useRef();

    const price = useRef();
    const stock = useRef();
    const weight = useRef();

    function Change(){



        
        setItem(i => {
            console.log(i)
            i.price = price.current.value
            i.inventory_quantity = stock.current.value
            i.weight = weight.current.value
            return i
        })
    }

    useEffect(() => {
        if(!load){
            setItem(props.item)
            setLoad(true)

        }
    })

    if(load){

    
        console.log(item)
    return (
        <>
        
        <div ref={modal} className="modal rounded" style={{display: "block"}}>
            <div className="modal-content p-2" ref={modalC}>
            
            <span className="close text-end me-3" onClick={props.modalClose}>&times;</span>

            <div className="p-2 rounded" style={{backgroundColor: "white"}}>
                <h1>{item.title}</h1>

                <div className="row">
                    <div className="col">
                        Price: <br></br>
                        <input onChange={Change} className="form-control"defaultValue={item.price} ref={price}></input>
                    </div>
                    <div className="col">
                        Stock: <br></br>
                        <input onChange={Change} className="form-control"defaultValue={item.inventory_quantity} ref={stock}>

                        </input>
                    </div>
                    <div className="col">
                        Weight {"(Grams)"}: <br></br>
                        <input onChange={Change} className="form-control"defaultValue={item.weight} ref={weight}></input>
                    </div>
                </div>



            </div>
            </div>

            </div>
        </> 
    )
    }
}