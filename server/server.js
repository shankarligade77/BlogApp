const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const utils = require("./utils");
const config = require("./config")




const app = express();
app.use(cors("*"));
app.use(express.json());
app.use(express.static('images'));
app.use(morgan("combined"));


app.use((request, response, next) => {
    
    if (request.url == "/user/signup" || request.url == "/user/signin"  ) {
    
      next();
    }
    
   
    
    else {
      
      const token = request.headers["x-token"];
      // console.log(request.headers['x-token']);
      // console.log('token created',token);
      if (!token) {
        response.send(utils.createErrorResult("token missing "));
      } else {
        try {
          
          const user = jwt.verify(token, config.key);
        
    
          request.user = user;
          next();
        } catch (ex) {
          // console.log(ex);
          response.send(utils.createErrorResult(ex));
        }
      }
    }
  });







const userRouter = require("./routes/user");
const blogitemsRoter = require('./routes/blog')


app.use('/user',userRouter)
app.use('/blog',blogitemsRoter)




// start the server
app.listen(4000,'0.0.0.0',()=>{
    console.log("Server started on port 4000")
})