import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createURL } from '../config';
import Navbar from './Navbar';
import {Link} from 'react-router-dom'

const MyBlogs = () => {
  const [myblogs, setMyBlog] = useState('');

  const navigate = useNavigate()

  const loadmyblogs = () => {
    const url = createURL('blog')
    const token = sessionStorage['token'];

    if (!token) {
      navigate('/')
      return;
    }
    axios.get(url, {
      headers: {
        'x-token': sessionStorage['token']
      }
    }).then(response => {
      const result = response.data;
      if (result['status'] === 'error') {
        toast.error("Error while fetching blog");

      } else {
        const result = response.data;
        if (result['data'].length === 0) {
          // toast.error("Empty")
        }
        else {
          setMyBlog(result['data'])
        }
      }
    })
  }


  const deleteblog = (id) => {


    console.log(`id = ${id}`)


    const url = createURL(`blog/${id}`)
    const token = sessionStorage['token']

    axios.delete(url,
      {
        headers: {
          'x-token': token,
        }, id
      }).then(res => {
        const result = res.data;
        if (result['status'] === 'success') {
          toast.success("deleted blog ")
          loadmyblogs();

        }
      }).catch(error => {
        toast.error("error occur")
      })

  }

  useEffect(() => {
    loadmyblogs();
  }, [])


  return <div>
    <Navbar />
    <h2 className="title">My Blogs</h2>

    {myblogs && (
      <ul className="list-group">
        {myblogs.map((blog) => {
          const { id, title, details } = blog;
          return (
            <li key={id} className="list-group-item  blogs">
              <div className="fw-bold blog-title">{title}</div>
              <div>{details}</div>
              <div>
              
                <button onClick={() => deleteblog(id)} className="btn btn-danger btn-sm float-end" >Delete</button>
                <Link to={`/edit-blog/${blog.id}`} className="btn btn-primary btn-sm float-end" style={{marginRight:'10px'}} >Edit</Link>
              
              </div>
            </li>
          )
        })}
      </ul>
    )}
  </div>
}

export default MyBlogs;

