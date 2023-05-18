import { useState } from "react";
import {toast} from 'react-toastify'
import axios from "axios";
import { createURL } from "../config";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onLogin = ()=>{
        if(email.length === 0){
        toast.error("please enter email")
        }
        else if(password.length === 0){
            toast.error("please enter password")
        }
        else{
            const url = createURL("user/signin");
            axios.post(url,{email,password}).then(response =>{
                const result = response.data
                if(result['status']=='success'){
                    const {firstName,lastName,token} = result['data']
                   sessionStorage['firstName'] = firstName
                   sessionStorage['lastName'] = lastName
                   sessionStorage['token'] = token
                   toast.success("Login successfully")
                  
                   navigate('/blogs');

                }
                else{
                    toast.error("Invali email or password")
                }
            })
        }
      }


    //   const onSignup = ()=>{
    //     navigate('/signup')
    //   }

    // return <div className="login-page" >
    //     <h1 className="text-center">Blog App</h1>
    //     <h2 className="title">Login</h2>

    //     <div className="row " >
    //         <div className="col"></div>
    //         <div className="col" >
    //             <div className="mb-3">
    //                 <label htmlFor="" className="form-label">Email</label>
    //                 <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" />
    //             </div>


    //             <div className="mb-3">
    //                 <label htmlFor="" className="form-label">Password</label>
    //                 <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
    //             </div>

    //             <div className="mb-3">
    //                 <button style={{marginRight:'30px'}} onClick={onLogin} className="btn btn-outline-success" >Login</button>
    //                 <button onClick={onSignup} className="btn btn-outline-primary" >Register</button>
                   
    //             </div>
    //         </div>
    //         <div className="col"></div>
    //     </div>

    // </div>

    return(
        <div className="container-md  ">
        <div className="row" >
          <div className="col"></div>
          <div className="col" style={{border:"1px solid black",borderRadius:"10px",marginTop:"90px"}}>
            <fieldset className="form-decoration">
              <h3 className="title" style={{padding:"20px"}}>Login</h3>
              <div className="form-group">
                <label>{/* <b>Email</b> */}</label>
                <input
                  style={{ textAlign: "center" }}
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="form-group ">
                <label>{/* <b>Password</b> */}</label>
                <input
                  style={{ textAlign: "center" }}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <br />
              <div className="form-group text-center" >
                <button style={{fontSize:"20px",padding:"4px 30px"}} type="submit" className="btn btn-success " onClick={onLogin}>
                  Login
                </button>
              
                <div style={{ marginTop: 10 }}>
                  <p>
                    Create New Account? <a href="/signup">register</a>
                  </p>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="col"></div>
        </div>
      </div>
    );
}

export default Login;