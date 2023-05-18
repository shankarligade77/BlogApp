import { useState, useEffect } from "react";
import { toast } from 'react-toastify'
import axios from "axios";
import { createURL } from "../config";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Blogs = () => {

 //hi
 

  const navigate = useNavigate()

  const [blogs, setBlog] = useState()
  const [likeCount,setLikeCount]= useState()

  // const [like, setLike] = useState(5)
  // const [isLike,setIsLike] = useState(false)
  // const [likeCount1,setLikeCount1] = useState()

  const onLike= (id)=>{
  
    const url = createURL(`blog/like/${id}`)
    const token = sessionStorage['token']
    // console.log('token on ',token);
    // console.log(id)

   
      axios({
        method: 'post', //you can set what request you want to be
        url: `http://localhost:4000/blog/like/${id}`,
        data: {id: id},
        headers: {
          "x-token": token
        }
      })

      .then(res => {
        const result = res.data;
        console.log(result);
        if (result['status'] === 'success') {
          toast.success("liked blog ")
         
          // console.log('kiran',likeOrNot);
          
          loaddata();
        }
        else{
          toast.warn("blog is already liked");
        }
      }).catch(error => {
        toast.error("blog is already liked");
      })  
      
      

     
  }

  const onDislike = (id) =>{
       const token = sessionStorage['token']
    axios({
      method: 'delete', //you can set what request you want to be
      url: `http://localhost:4000/blog/dis-like/${id}`,
      data: {id: id},
      headers: {
        "x-token": token
      }
    })

    .then(res => {
      const result = res.data;
      console.log(result);
      if (result['status'] === 'success') {
         toast.success("dis-liked blog ")
        
        loaddata();
      }
      else{
        toast.warn("blog is not liked yet");
      }
    }).catch(error => {
      toast.error("error occur",error)
      toast.warn("blog is not liked yet");
    })
  }
  

  const loaddata = () => {
    const url = createURL('blog/all');
    const token = sessionStorage['token'];

    if (!token) {
      navigate('/')
      return;
    }

    axios.get(url, {
      headers: {
        "x-token": token,
      },
    }).then((res) => {
      const result = res.data;
      console.log(result);

      if (result["status"] === "success") {

        setBlog(result['data']);
        
      }
      else {
        console.log(result);
        toast.error("Error during the load Blog")
        navigate('/')
      }
    }).catch((error) => {
      console.log(`error: `, error);
    })



   // get likes
   
   axios.get("http://localhost:4000/blog/like-count", {
    headers: {
      "x-token": token,
    },
  }).then((res) => {
    const result = res.data;
    // console.log(result);

    if (result["status"] === "success") {

      setLikeCount(result['data']);
      console.log(result['data']);
      // console.log(likeCount.count);
    }
    else {
      toast.error("Error during the load Blog")
      navigate('/')
    }
  }).catch((error) => {
    console.log(`error: `, error);
  })

  

  }



  useEffect(() => {
    loaddata()
  }, [])

  return <div>
    <Navbar />
    <h2 className="title">All Blogs</h2>
   

    {blogs && (
      <ul className="list-group ">
       
        {
        blogs.map((blog) => {
          const { id, title, details,  } = blog;

          return (
            // <div>
            <li key={id} className="list-group-item blogs ">
              <div>
                <div className="fw-bold blog-title">{title}</div>
                <div>{details}</div>
                <div className="float-end">
               
                  
                <button onClick={() => onLike(id)} className="btn btn-primary btn-sm" style={{ marginRight: '15px' }}>Like {likeCount && (
                   likeCount.map((likes)=>{
                   const {blogId,count} = likes;
                   if(blogId == id){

                     return(
                      
                     <span>{count}</span>
                    )
                   }
                  })
                )} </button>
                  
                  <button onClick={()=> onDislike(id)} className="btn btn-secondary btn-sm">Dislike</button>
                </div>

              </div>
             
             {/* <span>{likeCount.count}</span> */}
      
            </li>
            // </div>


          )
        })}
           
      </ul>

    )}
  
   

 

  </div>

}

export default Blogs;