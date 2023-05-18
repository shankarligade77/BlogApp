import { useState } from "react";
import{Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from "axios";
import { createURL } from "../config";
import { useNavigate } from "react-router-dom";
import  validator  from "validator";
const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const phoneregex = /^([7-9]{1})([0-9]{9})$/i
const Signup = () => {
    const navigate = useNavigate();
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    function onSignup () {
        // console.log("firstname =  "+typeof firstName + "lastname " + typeof(lastName) +"email  "+ typeof(email)+"password"+ typeof(password)+" phone"+ typeof(phone))
        if(firstName.length=== 0)
        {
          toast.error('Firstname must be fill')
        }
        else if(lastName.length === 0)
        {
          toast.error('Last name must be fill')
        }
        else if(email.length === 0)
        {
          toast.error('Email must be fill')
        }
        else if(password.length === 0)
        {
          toast.error('Password name must be fill')
        }
        else if(phone.length === 0 || phone.length !== 10)
        {
          toast.error('Enter Valid Phone Number')
        }
        else if(confirmPassword !== password) {
          toast.error('Passwords does not match')
        }
        else if(!validator.isStrongPassword(password, {minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1})){
          toast.warn("Enter Strong Password");
          toast.warning("Password should contain:\nminLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1");
        }
        else if (!regex.test(email)) {
          toast.warning("Enter valid email");
        }
        else {
          const url = createURL('user/signup')
          console.log(url);
          axios.post(url,{firstName,lastName, email , password ,phone }).then(res=>{
            const result = res.data;
            console.log(result)
            if(result['status']==='success')
            {
              toast.success('Data inserted')
              navigate("/")
            }
            else if(result['error'] === 'User already Exist')
            {
              toast.error("User already Exist")
            }
    
          }).catch(error=>{
          toast.error("error occur")
          })
        }
      }


    return <div>
        <h2 className="title">Sign up</h2>
        <div className="row">
            <div className="col-3"></div>
            <div className="col">
                <div className="mb-3">
                    <label htmlFor="" className="form-label">FirstName</label>
                    <input onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">LastName</label>
                    <input onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">Phone</label>
                    <input onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">Confirm Password</label>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" />
                </div>

                <div className="mb-3">
                    <button onClick={onSignup} className="btn btn-success" style={{marginRight:'30px'}}>Signup</button>
                     <Link to ='/' className="btn btn-danger" >Cancel</Link>
                </div>
            </div>
            <div className="col-3"></div>
        </div>

    </div>
}

export default Signup;