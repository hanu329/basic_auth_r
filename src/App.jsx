import {useRef, useState } from 'react'
import  {FileUploadForm} from './components/Form'


function App() {
  const [file, setFile] = useState("")
  const imgRef=useRef(null)
const clickFn=()=>{
  imgRef.current.click()
}
const changeFn=(event)=>{
  //console.log(event.target.files[0])
  setFile(event.target.files[0])

}
  return (
    <>
     app page
     <div onClick={clickFn}>
     {file?(
      <img src={URL.createObjectURL(file)} alt="" width='100px' height='100px'   />
     ):(
      <img src="vite.svg" alt="img here" width='100px' height='100px'   />
     )}
     <input type="file" name="" id="" ref={imgRef} onChange={changeFn} style={{display:"none"}} />
     </div>
   
  <hr />
  <FileUploadForm />
     
    </>
  )
}

export default App
