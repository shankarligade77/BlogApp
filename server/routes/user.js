const express = require("express");
const db = require('../db');  
const cryptoJs = require('crypto-js')
const utils  = require('../utils')
const config = require('../config')
const jwt = require('jsonwebtoken');
const multer = require("multer");

const upload  = multer({dest:"images",filename:(req,file,cb)=>{
  cb(null, `${Date.now}--${file.originalname}`);
}})




const router = express.Router()


router.post('/signup' ,(request, response)=>{
    console.log('user/signin route')
    const {firstName , lastName,email,password,phone} = request.body;

    //encrypt the data by cryptojs
    const encryptedPassword = String(cryptoJs.SHA1(password))

    const query = `insert into user (firstName, lastName, email, password, phone) values (?, ?, ?, ?, ?)`;
    db.query(
      query,
      [firstName, lastName, email, encryptedPassword, phone],
      (error, result) => {
response.send(utils.createResult(error,result));
      }
    );
})



router.post('/signin',(request,response)=>{
    // console.log('user/signiup Route ')
    const {email,password} = request.body;

    //encrypted password 
    const encryptedPassword = String(cryptoJs.SHA1(password))

    const query = `select id ,firstName ,lastName from user where email = ? and password = ?`;

    db.query(query,[email,encryptedPassword],(error,user)=>{
        if(error)
        {
            response.send(utils.createErrorResult(error))
        }else if( user.length == 0 )
        {
            response.send(utils.createErrorResult('User does not exit'))
        }
        else{

            // success then extract the information from the user 
            // const {firstName , lastName , id} = user
            const {firstName , lastName , id} = user[0]


            // create a  jwt token 

            const token = jwt.sign({
                id,firstName,lastName
            },
            config.key);

            response.send(utils.createSuccessResult(
                {
                    firstName,lastName,token
                }
            ))
        }
    })

})




router.get("/profile", (request, response) => {
    const id = request.user.id;
    // const query = `select firstName, lastName, email, phone, profile_image from user where id = ?`;
    const query = `select firstName, lastName, email, phone from user where id = ?`;
    db.query(query, [id], (error, users) => {
      if (error) {
        response.send(utils.createErrorResult(error));
      } else if (users.length == 0) {
        response.send(utils.createErrorResult("user does not exist"));
      } else {
        response.send(utils.createSuccessResult(users[0]));
      }
    });
  });






  router.post("/upload-image", upload.single("image"), (request, response) => {
    const filename = request.file.filename;

    if (!filename || filename.length == 0) {
        response.send("your image uploading did not work, please try again");

    } else {
        const query = `update user set profile_image = ? where id= ?`;
        db.query(query, [filename, request.user.id], (error, result) => {
            response.send(utils.createResult(error, result));
        })
    }
});







router.get("/profile-image", (request, response) => {
  const id = request.user.id;
  const query = `select firstName,profile_image from user where id=?`;
  db.query(query, [id], (error, users) => {
      if (error) {
          response.send(utils.createErrorResult(error))
      } else if (users.length == 0) {
          response.send(utils.createErrorResult("error while sending your profile"))
      } else {
          response.send(utils.createSuccessResult(users[0]));
      }
  })
});

module.exports = router;