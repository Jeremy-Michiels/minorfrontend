import { useEffect, useState } from "react"
import {useLocation } from "react-router-dom"
import StockOptions from "../Parts/StockOptions"
import ModalForStock from "./ModalForStock"

function EditStock(props){

    const [item, setItem] = useState({})
    const [load, setLoad] = useState(false)
    const [back, setBack] = useState(() => {})
    const [selOpt, setSelOpt] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const [curModal, setCurModal] = useState({})

    

    useEffect(() =>{
        if(!load){
            setItem(props.item)
            setLoad(true)
        }
    }, [])
    if(load){
        return (
            <>
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
                            <div className="row border border-dark rounded p-3">
                                <h6>{selOpt.name}</h6>

                                {selOpt.values !== undefined ? (
                                    <>
                                    <ul>
                                    {selOpt.values.map(op => (
                                        <div key={op}>
                                        <li className="text-start">
                                            <h7>{op}</h7>
                                            
                                        </li>
                                        </div>
                                    ))}
                                </ul>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )}
                                
                        </div>
                        ) : <></>}
                        

                        <div className="m-2">
                            <h5>Stock</h5>
                            <div className="row mb-1 p-3 border border-dark rounded">
                                <div className="col-4">
                                    <h6>Name</h6>
                                </div>
                                <div className="col">
                                    <h6>Price</h6>
                                </div>
                                <div className="col">
                                    <h6>Current stock</h6>
                                </div>
                                <div className="col"></div>
                            {item.variants.map(y => (
                                <div key={y.id} className="row mb-1 ms-2 me-2 p-1 border border-dark rounded">
                                    <div className="col-4">
                                    {y.title}
                                    </div>
                                    <div className="col">
                                    {y.price}
                                    </div>
                                    <div className="col">
                                        {y.inventory_quantity}
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-primary p-1" onClick={() => {
                                            setModalOpen(true)
                                            setCurModal(y)
                                            }}>
                                            View/Edit
                                        </button>
                                    </div>
                                    {modalOpen && curModal === y ? <ModalForStock item={y} modalClose={() => {
                                        if(modalOpen){
                                            setModalOpen(false)
                                        }
                                        }}></ModalForStock> : <></>}
                                </div>
                            ))}
                            </div>
                            
                            

                        </div>

                    </div>
                    <div className="col">
                        <img src={item.images[0].src} style={{width: "60%"}} className="border border-dark rounded"></img>
                    </div>
                    <div className="row">
                    <div className="col">
                        <button className="btn btn-success">
                            Save
                        </button>
                    </div>
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