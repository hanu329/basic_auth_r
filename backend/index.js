
const express= require("express");
const multer = require("multer");
const cors = require("cors")
const axios= require("axios")
// import  express from 'express';
// import multer, { memoryStorage } from 'multer';
// import cors from 'cors';
// import axios from 'axios'

const app = express();
const port = 3000;

//const storage = multer.memoryStorage(); 
const storage = multer.memoryStorage()
const upload = multer({ dest:"uploads/" })
app.use(cors())
app.post('/user', upload.single('file'), async (req, res) => {


 const {name,email} = req.body;
 const file = req.file;
console.log(file, name, email)
//  await axios.post('http://localhost:3001/user', {
//    name: name,
//    email: email,
//    file:file,
  
//  });
})



app.post('/userT',upload.fields([{ name: 'file1' }, { name: 'file2' }]), async (req, res) => {

  const {name,email} = await req.body;
  
  const file1 = await req.files['file1']? req.files['file1'][0]:null;
  const file2 = await  req.files['file2']? req.files['file2'][0]:null;

 console.log(file1,file2, name, email)
 //  await axios.post('http://localhost:3001/user', {
 //    name: name,
 //    email: email,
 //    file:file,
   
 //  });
 
 res.json({ message: 'File uploaded successfullyT.' });
 })


 app.post('/userM', upload.array('file1' || 'file2'), async (req, res) => {

   
     const {name,email} = req.body;
     const file = req.files;
     console.log(file, name, email)
    //  await axios.post('http://localhost:3001/user', {
    //    name: name,
    //    email: email,
    //    file:file,
      
    //  });

 res.json({ message: 'File uploaded successfully.' });
});

app.listen(port, () => {
 console.log(`Server is running at http://localhost:${port}`);
});
