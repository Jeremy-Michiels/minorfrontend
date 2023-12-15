import './Style/bootstrap/css/bootstrap.min.css';
import './Style/App.css';
import Logo from './Assets/Logo.png'
import { useRef, useState } from 'react';
import EditStock from './Components/EditStock';

function App() {

  const [SignedIn, SetSignedIn] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [text, setText] = useState("")
  const [business, setBusiness] = useState("");
  const [clothing, setClothing] = useState([])
  const [postClothing, SetPostClothing] = useState(false)
  const [Loader, setLoader] = useState(false)
  const [src, setSrc] = useState("")
  const [selItem, setSelItem] = useState({})
  const [selOpen, setSelOpen] = useState(false)
  const [activeSizes, SetActiveSizes] = useState([])
  const [currentId, setCurrentId] = useState(1);

  const input = useRef(); 


  const title = useRef();
  const product_Type = useRef();
  const desc = useRef();
  const image = useRef();

  function submit(){
    var variants = []
    var sizes = []
    var bool = false
    if(activeSizes.length < 1){
      alert("Please add at least 1 size/price")
      bool=true
    }
    if(title.current.value === ""){
      alert("Please fill in a Title")
      bool=true
    }
    if(desc.current.value === ""){
      alert("Please fill in a valid description")
      bool = true
    }
    if(product_Type.current.value === ""){
      alert("Please fill in a valid product type")
      bool = true
    }
    if(src === ""){
      alert("Please fill in a valid picture")
      bool = true
    }

    activeSizes.forEach(y => {
      if(y.option1 === "" || y.price === ""){
        alert("Please fill in all the size/price values")
        bool = true
      }

      variants.push({
        option1: y.option1,
        price: y.price,
        sku: y.sku,
      })
      sizes.push(y.option1)
    })
    if(!bool){
    const product = {
      title: title.current.value,
      body_html: desc.current.value,
      vendor: business,
      product_type: product_Type.current.value,
      images: [{"attachment": src}],
      variants: variants,
      options: [{name: "Size", values: sizes}],
      status: "archived"
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
  }

  function EditStocks(item){
    setSelItem(item)
    setSelOpen(true)
  }

  function LogIn(){
    if(input.current.value.length < 1){
      setText("Please fill in your API key")
    }
    else{
    setLoader(true)
    fetch("https://localhost:7123/api/APIKey/" + input.current.value)
    .then(res => res.json())
    .then((result) => {
      setLoader(false)
      setApiKey(result.key)
      setBusiness(result.brand)
      SetSignedIn(true)
      setText("")
    }, (error) => {
      setLoader(false)

      setText("API key does not exist")
    })
  }
  }

  function goBack(){
    if(selOpen){
      setSelOpen(false)
      setSelItem({})
    }
    else{
      setClothing([])
      SetActiveSizes([])
      setCurrentId(1)
      SetPostClothing(false)
      setSrc("")
    }
    
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
  function blobj(){
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

  function changePrices(s, plus){

    var list = activeSizes.map(y => {
      if(y.id === s.id){
        return {
          ...y, 
        price: plus.target.value,
        }

      }
      else{
        return y
      }
    })
    console.log(list)
    SetActiveSizes(list)

  }

  function changeSizes(s, plus){
    var list = activeSizes.map(y => {
      if(y.id === s.id){
        return {
          ...y, 
        option1: plus.target.value,
        }

      }
      else{
        return y
      }
    })
    console.log(list)
    SetActiveSizes(list)
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
            {text.length > 0 ? <div className='error'>{text}</div> : <></>}
            <button className='btn btn-primary m-1' onClick={LogIn}>
              Sign in
            </button>
          </div>
        </div>
        ) : <>
        {clothing.length > 0 ? (
          <>

          {selOpen ? (
            <EditStock item={selItem} back={goBack}></EditStock>
          ) : (
            <>
                      <div className='row'>
          <div className='col-auto'>
          <div className='border border-dark rounded p-2' onClick={goBack} style={{cursor: 'pointer'}}>
            <h1 className='text-start'>Go Back</h1>
            </div>
            </div>
            </div>
          {clothing.map(item => (
            <div key={item.id}>
            <div className='row m-3 p-2 items rounded'>
              <div className='col text-center' style={{position: 'relative'}}>
                <div >
                <h3>{item.title}</h3>
                <h6>{removeTags(item.body_html)}</h6>
                
                <div className='row'>
                  <div className='col'>
                  <button className='btn btn-primary bottom' onClick={() => EditStocks(item)}>
                  Edit stock
                </button>
                  </div>
                  <div className='col'>
                    <a href={'https://www.agacent.com/products/' + item.handle}>
                  <button className='btn btn-dark bottom'>
                  View on Agacent
                </button>
                </a>
                  </div>
                </div>
                
                </div>
              </div>
              <div className='col'>
                <img src={item.images[0] !== undefined ? item.images[0].src : ""  } style={{width: "50%", height: "auto"}} alt='Selected'></img>
              </div>
            </div>
            </div>

))}
            </>
          )}


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
                {image.current !== undefined ? <img src={src} className='border border-dark rounded'  style={{width: "50%", height: "auto"}} alt='Selected'></img> : <></>}
              </div>
              <div>
                <h4>Sizes</h4>
                <div className='border border-dark rounded p-2'>
                  {activeSizes.map(s => (
                    <>
                    <div className='row p-2'>
                    <div className='col'>
                        <input type='text' className='form-control' placeholder='size' onChange={(plus) => changeSizes(s, plus)}>

                        </input>
                      </div>
                      <div className='col'>
                        <input type='text' className='form-control' placeholder='price' onChange={(plus) => changePrices(s, plus)}>

                        </input>
                      </div>
                      
                    </div>
                    </>
                  ))}
                  <div className='text-center'>
                    <button className='btn btn-success' onClick={() => {
                      SetActiveSizes(old => [...old, {
                        id: currentId,
                        option1: "",
                        price: "",
                        sku: "1"
                      }])
                      setCurrentId(id => id + 1)
                    }}>
                      +
                      </button>
                  </div>
                </div>
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
