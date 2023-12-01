const Store = require('../model/userModel');
const Product = require('../model/productModel');
const dotenv = require('dotenv').config();
const Jwt = require('jsonwebtoken');
const path = require('path');

//for signup
exports.usercreate = async (req, res) => {

    try {
        const data = req.body;
        console.log(data)
        const response = await Store.create(data)
        res.send(response);
    } catch (error) {
        console.log(error)
    }
}
//for login
exports.userlogin = async (req, res) => {
    const data = req.body;
    //console.log(data)
    if (req.body.email && req.body.password) {
        try {
            // const data = req.body;
            const ress = await Store.findAll(
                {
                    where: {
                        email: req.body.email,
                        password: req.body.password,
                    },

                }

            )
            const userId = ress[0].id;
            const userEmail = ress[0].email;

            //console.log(ress[0].id)
            // console.log(ress[0].email)

            if (ress) {
                Jwt.sign({ id: userId, email: userEmail }, process.env.JWT_SECRET_KEY, (err, token) => {
                    res.send({ id: userId, email: userEmail, auth: token })
                })
                //   res.send(ress)
            } else {
                res.send({
                    msg: "not found"
                })
            }
            // console.log(res)

        } catch (error) {
            console.log(error)
        }
    } else {
        res.send({
            msg: "not found"
        })
    }

}
//user profile
exports.userprofile = async (req, res) => {
    let auth = req.headers.auth;
    console.log(auth)
   
    //const userId = req.params.id;
    if(auth){
        let jw = Jwt.verify(auth, process.env.JWT_SECRET_KEY)
        let authId = jw.id;
        //console.log(authId)
        try {
          
            const ress = await Store.findAll(
                {
                    where: {
                        id:authId,
                    }
    
                }
    
            )
            res.send(ress)
            // console.log(ress[0].email)
        } catch (error) {
            console.log(error)
        }
    }else{
        res.send({res:"not found auth"})
    }
    

}

//add product

exports.addProduct = async (req,res)=>{
    // res.send({result:"done"})
    const auth = req.headers.auth;
    //console.log(auth)
    const jw = Jwt.verify(auth, process.env.JWT_SECRET_KEY)
    const authId = jw.id;
  
  
  if(!req.file){
    res.send({error:"upload image"})
  }else{
  
    try {
        const data = req.body;
        const image_url = 'http://localhost:3032/uploads/' +req.file.filename;
        data.userId = authId;
        data['image'] = image_url;
        const response = await Product.create(data)
        // console.log(res)
        res.send(response);
        console.log(response)
    } catch (error) {
        console.log(error)
    }
  }
      

    
}

exports.products= async (req,res,next)=>{
    const auth = req.headers.auth;
    console.log(auth)
    
     //const userId = req.params.id;
     if(auth){
         const jw = Jwt.verify(auth, process.env.JWT_SECRET_KEY)
         const authId = jw.id;
         //console.log(authId)
         try {
           
             const ress = await Product.findAll()
             res.send(ress)
             
         } catch (error) {
             console.log(error)
         }
     }else{
         res.send({res:"not found auth"})
     }
     
}
