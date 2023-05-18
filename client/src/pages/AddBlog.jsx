import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { createURL } from '../config';
import Navbar from './Navbar';

const AddBlog = ()=>{
    const [details, setDetails] = useState('')
    const [title, setTitle] = useState('')
    const navigate = useNavigate();
      
   

    const onSave = () => {

        if(title.length === 0)
        {
          toast.error("Enter the title of the blog ")
        }
        else if( details.length === 0)
        {
          toast.error("Enter the content of the blog ")
        }
        else{
          const url = createURL('blog/')
         
          axios.post(url,{
            title,details
          },{
            headers :{
              'x-token' : sessionStorage['token']
            }
          }).then(response=>{
            const result = response.data;
            if(result['status'] === 'success'){
              toast.success("Blog created successfully");
              navigate('/blogs')
            }else{
              toast.error("Error while creating blog")
            }
          })
        }
    
      }
      const cancel = () => {
     navigate('/blogs')
      }


    return <div>
        <Navbar/>
          <h2 className="title">Add Blog</h2>
          
          <div className="mb-3">
            <div className="row">
                <div className="col-2"></div>
                <div className="col">
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Title:</label>
                    <input onChange={e=>setTitle(e.target.value)} type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">Details:</label>
                    <textarea onChange={e=>setDetails(e.target.value)} type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <button style={{marginRight:'30px'}} onClick={onSave} className="btn btn-success" >Save</button>
                   <Link to='/blogs'className="btn btn-danger" >Cancel</Link>
                </div>
                </div>
                <div className="col-2"></div>
            </div>
          </div>
    </div>
}

export default AddBlog