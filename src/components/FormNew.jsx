


import React ,{useState, useEffect} from 'react'
import axios from 'axios';
import './css/form.css'

export const FormNew = () => {
    const [data, setData]= useState([])
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: "",
      mobile: '',
      panNumber: "",
      aadharNumber: "",
    aadhar_file:null,
    pan_file:null,
  
    });





const handleChange = (e) => {

    const { name, value } = e.target;

  if(e.target.files){
  setFormData((prevData) =>{
   let s={...prevData, [e.target.name]:e.target.files[0]}
 // console.log(s)
  return s
    })
  }
  else{
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};
const fetchData =async ()=>{

    // var credentials = ;
    var basicAuth = 'Basic ' + btoa(`Housemanager:Housemanager@123`);
    try {
        const response = await axios.get('https://housemanager.webbulldesign.com/getAllCustomer', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': + basicAuth,
          },
          auth: {
            username: "Housemanager",
            password: "Housemanager@123"
          }
        }
      );
        console.log(' get :', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
}

useEffect(()=>{
   fetchData()



},[])


const handleSubmit= async (e)=>{
    e.preventDefault();
const {name, email, password,
mobile,
panNumber,
aadharNumber,aadhar_file, pan_file, }= formData
const obj={
  name,
  email,
  password,
  mobile,
  panNumber,
  aadharNumber
}
const res= JSON.stringify(obj)
    const fdata = new FormData();
    fdata.append('data', res);
    fdata.append('uploadPan', pan_file);
    fdata.append('uploadAadhar', aadhar_file);
   
     for (var pair of fdata.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      var credentials = btoa("Housemanager" + ':' + "Housemanager@123");
      var basicAuth = 'Basic ' + credentials;
    try {
      const response = await axios.post('https://housemanager.webbulldesign.com/addCustomer', fdata,
       {
        headers: {
            'Authorization': + basicAuth,
            "Access-Control-Allow-Origin": "*",
          'Content-Type': 'multipart/form-data',
        },
        auth: {
            username: "Housemanager",
            password: "Housemanager@123"
          }
      }
    );
  
      console.log('Form submitted successfully:', response.data);
      window.location.href=''
    } catch (error) {
      console.error('Error submitting form:', error.response.data);
    }
      
  
}
// var credentials = btoa(username + ':' + password);
// var basicAuth = 'Basic ' + credentials;
// headers: { 'Authorization': + basicAuth }
console.log(formData)
  return (
    <div className='container'>
<h2>Sign up</h2>

<form onSubmit={handleSubmit} encType="multipart/form-data">
  
        <label htmlFor="name">Name:</label>
        <div>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        </div>
  
    
        <label htmlFor="email">Email:</label>
        <div>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
   

        <label htmlFor="password">Password:</label>
        <div>
        <input
          type="passnword"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
   
        <label htmlFor="mobile">Mobile No:</label>
        <div>
        <input
          type="number"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
      </div>
     
        <label htmlFor="panNumber">Pan Number:</label>
        <div>
        <input
          type="number"
          id="panNumber"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
        />
      </div>
  
        <label htmlFor="aadharNumber">Aadhar Number:</label>
        <div>
        <input
          type="number"
          id="aadharNumber"
          name="aadharNumber"
          value={formData.aadharNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="file">Adhar File:</label>
        <input type="file" id="file1" name="aadhar_file" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="file">Pan File:</label>
        <input type="file" id="file2" name="pan_file" onChange={handleChange} />
      </div>
   
      <div> 
        <button type="submit">Submit</button>
      </div>
    </form>

    </div>
  )
}

