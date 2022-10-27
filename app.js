// Task1: initiate app and run server at 3000
const express = require('express')
const app = express()
const mongoose= require('mongoose')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection
const employeeData = require('./models/employees');
mongoose.connect('mongodb+srv://Ayishu:ayishunizar@cluster0.xqscbar.mongodb.net/casestudy?retryWrites=true&w=majority')
.then(()=>{
    console.log('My mondodb is connected successfully!!')
})
.catch(error=>{
    console.log('connection error'+ error)
})


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',(req,res)=>{
   employeeData.find().then(function(data){
    res.send(data)
   })

})

//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',(req,res)=>{
    employeeData.findOne({"_id":req.params.id}).then(function(data){
        res.send(data)
    })
})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async (req,res)=>{
  let item =req.body
  const user = new employeeData(item);
  const savedUser = await user.save();
  res.send(savedUser);
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',async (req,res)=>{
    let id= req.params.id
try {
    const result= await employeeData.findByIdAndDelete(id)
    res.send(result)
    
} catch (error) {
    console.log('error')
}

})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',async (req,res)=>{
    try {
        const result=await employeeData.findByIdAndUpdate({"_id":req.body._id,},
           {

            $set: {
                 "name":req.body.name,
                 "location":req.body.location,
                 "position":req.body.position,
                 "salary":req.body.salary
            }
        }
             )
        res.send(result)
    } catch (error) {
        console.log(error)
    }
   
    })



//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
     console.log(`server is connected in port ${PORT}!!`)
})
