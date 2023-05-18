
import {Link, useNavigate,  useParams } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from './Navbar'
const EditBlog = ()=>{

    const {id} =useParams();
    const [details, setDetails] = useState('')
    const [title, setTitle] = useState('')
    const navigate = useNavigate();

    const onSave = () => {

        const token = sessionStorage["token"];
        if (!token) {
            navigate("/");
            return;
        }

        axios.put(`http://localhost:4000/blog/edit-blog/${id}`, { title,details,id}, { headers: { "x-token": sessionStorage["token"] } })
        .then((response) => {
            const result = response.data;
            if (result["status"] === "success") {
                const data = result["data"];
                toast.success("successfully update blog");
                navigate('/myblogs')
            } else {
                toast.error("error while update blog")
            }
        })



    }
  
    return <div>
        <Navbar/>
      <h2 className="title">Edit Blog</h2>
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


export default EditBlog;