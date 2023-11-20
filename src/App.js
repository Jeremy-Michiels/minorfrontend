import './Style/bootstrap/css/bootstrap.min.css';
import './Style/App.css';
import Logo from './Assets/Logo.png'
import { useEffect, useRef, useState } from 'react';

function App() {

  const [SignedIn, SetSignedIn] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [business, setBusiness] = useState("");
  const [clothing, setClothing] = useState([])
  const [postClothing, SetPostClothing] = useState(false)
  const [Loader, setLoader] = useState(false)
  const [src, setSrc] = useState("")

  const input = useRef();


  const title = useRef();
  const product_Type = useRef();
  const desc = useRef();
  const image = useRef();

  function submit(){
    const product = {
      title: title.current.value,
      body_html: desc.current.value,
      vendor: business,
      product_type: product_Type.current.value,
      images: [{"attachment": src}]
    }
    fetch("https://localhost:7123/api/Shopify/PostProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key: apiKey,
        body: product
      })
    })
    .then(res => res.text())
    .then((result) => {
      alert(result)
    }, (error) => {
      console.log(error)
    })
  }

  function LogIn(){
    setLoader(true)
    fetch("https://localhost:7123/api/APIKey/" + input.current.value)
    .then(res => res.json())
    .then((result) => {
      setLoader(false)
      setApiKey(result.key)
      setBusiness(result.brand)
      SetSignedIn(true)
    }, (error) => {

    })
  }
  function goBack(){
    setClothing([])
    SetPostClothing(false)
    setSrc("")
  }
  

function removeTags(str) {
  if ((str===null) || (str===''))
      return false;
  else
      str = str.toString();
       
  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace( /(<([^>]+)>)/ig, '');
}
  function GetShopify(){
    setLoader(true)
    fetch("https://localhost:7123/api/Shopify/GetProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "Key": apiKey
      })
    })
    .then(res => res.json())
    .then((result) => {
      setClothing(result.products)
      setLoader(false)
    })
  }
  function blobj(idk){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setSrc(reader.result)
    }, 
    false, 
    );
    
    if(image.current.files[0]){
      reader.readAsDataURL(image.current.files[0])
    }
  }

  function LogOut(){
    setApiKey("")
    setBusiness("")
    SetSignedIn(false)
  }

  function checkEnter(data){
    if(data.code === "Enter"){
      LogIn()
    }
  }


  return (
    <div className="App">
      <div className="header p-2">
        <div className='container'>
        <div className='row'>
          <div className='col-auto text-start'>
          <img src={Logo} style={{width:"135px", height: "126px"}} alt='Logo'></img>
            
          </div>
          <div className='col text-start'>
          <h1 className='TextHeader'>Business</h1>
          </div>
          {SignedIn ? (
          <div className='col-auto p-2 justify-content-end'>
            {business}
            <div className='border border-dark rounded p-2' onClick={LogOut} style={{cursor: 'pointer'}}>
            <h1 className='text-end'>Log out</h1>
            </div>
          
        </div>
        ) : <></>}
        </div>
        
        
        </div>
      </div>
      <div className='p-2'>

      {Loader ? (
        <>
        <div className='loader'>

        </div>
        </>
      ) : 
      (
      <div className='container'>
        {!SignedIn ? (
          <div className='row p-2 justify-content-center'>
          <div className='col-auto'>
            Sign in
            <input type='text' className='form-control' placeholder='API Key' ref={input} onKeyDown={checkEnter}>
            </input>
            <button className='btn btn-primary m-1' onClick={LogIn}>
              Sign in
            </button>
          </div>
        </div>
        ) : <>
        {clothing.length > 0 ? (
          <>
          <div className='row'>
          <div className='col-auto'>
          <div className='border border-dark rounded p-2' onClick={goBack} style={{cursor: 'pointer'}}>
            <h1 className='text-start'>Go Back</h1>
            </div>
            </div>
            </div>
          {clothing.map(item => (
            <>
            <div className='row m-3 p-2 items rounded'>
              <div className='col text-center' style={{position: 'relative'}}>
                <div >
                <h3>{item.title}</h3>
                <h6>{removeTags(item.body_html)}</h6>
                
                <button className='btn btn-primary bottom'>
                  Edit stock
                </button>
                </div>
              </div>
              <div className='col'>
                <img src={item.images[0] !== undefined ? item.images[0].src : ""  } style={{width: "50%", height: "auto"}}></img>
              </div>
            </div>
            </>

))}
          </>
        ) : 
        <>

        {postClothing ? (
          <>
          <div className='row'>
          <div className='col-auto'>
          <div className='border border-dark rounded p-2' onClick={goBack} style={{cursor: 'pointer'}}>
            <h1 className='text-start'>Go Back</h1>
            </div>
            </div>
            </div>
            <div className='row m-3 p-2 items rounded' >
              <div className='col-auto'>
                <h4>Title</h4>
                <input type='text' className='form-control' placeholder='Title' ref={title}></input>
                <h4>Description</h4>
                <input type='text' className='form-control' placeholder='Description' ref={desc}/>
                <h4>Product Type</h4>
                <input type='text' className='form-control' placeholder='Product Type' ref={product_Type}></input>
                <h4>Insert picture</h4>
                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" ref={image} onChange={blobj}></input>
                <br/>
                <br/>
                
              </div>
              <div className='col text-center'>
                {image.current !== undefined ? <img src={src} className='border border-dark rounded'  style={{width: "50%", height: "auto"}}></img> : <></>}
              </div>
              <div>
              <button className='btn btn-primary m-3' onClick={submit}>
                  Submit
                </button>
                </div>
            </div>
          </>
        ) : (
          <>
          <div className='row p-2 justify-content-center'>
          <div className='col'>
            <button className='btn btn-primary' onClick={GetShopify}>
              Get clothing data
            </button>
          </div>
          <div className='col'>
            <button className='btn btn-success' onClick={() => SetPostClothing(true)}>
              Post new clothing
            </button>
          </div>
        </div>
          </>
        )}
        
        </>
        }
        
        </>
        }
        
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
