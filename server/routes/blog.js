const { response } = require("express");
const express = require("express");
const db = require('../db');
const utils = require('../utils')




const router = express.Router()



router.post("/", (request, response) => {
    const { title, details } = request.body;
  
    const query = `insert into blogItems (title, details, userId) values (?, ?, ?)`;
    db.query(query, [title, details, request.user.id], (error, result) => {
      response.send(utils.createResult(error, result));
    });
  });

  router.get("/", (request, response) => {
    const query = `select id, title, details, status from blogItems where userId = ?`;
    db.query(query, [request.user.id], (error, result) => {
      response.send(utils.createResult(error, result));
    });
  });


  
  router.get("/all", (request, response) => {
    const query = `select id, title, details from blogItems`;
    
    db.query(query, [], (error, result) => {
      response.send(utils.createResult(error, result));
    });
  });


 router.post("/like/:id",(req,res)=>{
  const { id } = req.params;
    
   const query = `select count (*) as count from feedback where blogId = ? and userId = ?`;
   db.query(query, [id, req.user.id], (error, result) => {
    if (error) {
      res.send(utils.createErrorResult(error));
    } else if (result.length == 0) {
      res.send(utils.createErrorResult("invalid result"));
    } else {
      const info = result[0];
      if (info["count"] !== 0) {
        console.log("blog is already liked");
        res.send(
          utils.createErrorResult("this blog is liked")
          
        );
      } 
      else{
        const q = `insert into feedback (blogId,userId) values (?,?)`;
        db.query(q,[id,req.user.id],(error,result)=>{
          
          res.send(utils.createResult(error, result));
        })
      }
    }
  })

   
 })

  router.put("/like/:id",(request, response)=>{

    const { id } = request.params;

    
    const query = `update blogItems set likeCount = likeCount+1, users = "?" where id = ?`;
    db.query(query,[request.user.id,id],(error,result)=>{
     
      response.send(utils.createResult(error, result));
    })
  })


  router.delete("/dis-like/:id",(req, res)=>{
    
    const { id } = req.params;
    
    const query = `select count (*) as count from feedback where blogId = ? and userId = ?`;
    db.query(query, [id, req.user.id], (error, result) => {
     if (error) {
       res.send(utils.createErrorResult(error));
     } else if (result.length == 0) {
       res.send(utils.createErrorResult("invalid result"));
     } else {
       const info = result[0];
       if (info["count"] == 0) {
         console.log("blog is not liked yet");
         res.send(
           utils.createErrorResult("this blog is not liked")
           
         );
       } 
       else{
         const q = `delete from feedback where blogId = ? and userId = ?`;
         db.query(q,[id,req.user.id],(error,result)=>{
           
           res.send(utils.createResult(error, result));
         })
       }
     }
   })
 
  })


  router.get("/like-count",(req,res)=>{
    const query = `select blogId,count(blogId) as count from feedback group by blogId`;
    db.query(query,[],(error,result)=>{
     res.send(utils.createResult(error,result));
    })
  })



  router.put("/edit-blog/:id", (request, response) => {
    const { title, details } = request.body;
    const { id } = request.params;
    const checkOwnerQuery = `select count (*) as count from blogItems where id = ? and userId = ?`;
    db.query(checkOwnerQuery, [id, request.user.id], (error, result) => {
      if (error) {
        response.send(utils.createErrorResult(error));
      } else if (result.length == 0) {
        response.send(utils.createErrorResult("invalid result"));
      } else {
        const info = result[0];
        if (info["count"] == 0) {
          response.send(
            utils.createErrorResult("this blog does not belong to you")
          );
        } else {
          const query = `update blogItems set title = ?, details = ? where id = ?`;
          db.query(query, [title, details, id], (error, result) => {
            response.send(utils.createResult(error, result));
          });
        }
      }
    });
  });



  router.delete("/:id", (request, response) => {
    const { id } = request.params;
  
    // check if this todoItem belongs to the logged in user
    const checkOwnerQuery = `select count (*) as count from blogItems where id = ? and userId = ?`;
    db.query(checkOwnerQuery, [id, request.user.id], (error, result) => {
      if (error) {
        response.send(utils.createErrorResult(error));
      } else if (result.length == 0) {
        response.send(utils.createErrorResult("invalid result"));
      } else {
        const info = result[0];
        if (info["count"] == 0) {
          response.send(
            utils.createErrorResult("this blog  does not belong to you")
          );
        } else {
          const query = `delete from blogItems where id = ?`;
          db.query(query, [id], (error, result) => {
            response.send(utils.createResult(error, result));
          });
        }
      }
    });
  });





module.exports = router;