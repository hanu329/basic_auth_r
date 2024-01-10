
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const  FileUploadForm = () => {
  const [data, setData]= useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    //  file: null,
    files:[]
  });



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: files ? files[0] : value,
    // }));
  
  setFormData((prevData) => ({
    ...prevData,
    [name]: files ? [...(prevData[name] || []), files[0]] : value,
  }));
};
useEffect( ()=>{
    const getUsr=async ()=>{
        try{
            const res= await axios.get("http://localhost:3001/user")
          
             setData(res.data)
                }
               catch(e){
                console.log("some error",e)
               }
      }
  getUsr()
},[])

console.log("data",data)

  const handleSubmit = async (e) => {
    e.preventDefault();
const {name, email, file, files}= formData
    const fdata = new FormData();
    fdata.append('name', name);
    fdata.append('email', email);
     //fdata.append('file', file);
     fdata.append('files', files);
     for (var pair of fdata.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
    try {
      const response = await axios.post('http://localhost:3000/userM', fdata,
       {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  console.log(formData)

  return (
     <div>
   <div>

    {/* {data.file?(
        data.file.map((el)=>(
      
          <div>
                {console.log(el)}

            <img
              src={`http://localhost:3001/${el}`} 
              alt={`PNG File for ${user.name}`}
              style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
          </div>
        ))
    ):
    ""} */}
   </div>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label htmlFor="file">File:</label>
        <input type="file" id="file1" name="file" onChange={handleChange} />
      </div> */}
      <div>
        <label htmlFor="file">File:</label>
        <input type="file" id="file2" name="files"  onChange={handleChange} multiple />
      </div>
      <div> 
        <button type="submit">Submit</button>
      </div>
    </form>
    </div>
  );
};


